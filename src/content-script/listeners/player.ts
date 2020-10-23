import { debug } from '@root/lib/utils';
import socket from '@root/lib/socket';
import { SocketEvents } from '@root/lib/constants/socket';
import store from '@contentScript/store';

//------------------------------------------------------------------------------

// functions for each platform that can be run to get their video
const videoLocators = {
  youtube: () => {
    return document.querySelector('.html5-main-video');
  },
  vimeo: () => {
    return document.querySelector('video');
  },
  default: () => {
    return document.querySelector('video');
  },
};

//------------------------------------------------------------------------------

function findVideoPlayer() {
  const url = window.location.href;
  const platforms = ['youtube', 'vimeo'];

  let player = null;

  for (let i = 0; i < platforms.length; i += 1) {
    const platform = platforms[i];
    if (url.includes(platform)) {
      debug(`Located ${platform} video element`);
      player = videoLocators[platform]();
      debug(player);
    }
  }

  // Unknown site, try to get video anyway
  if (!player) player = videoLocators.default();

  // Still no player? Fail
  if (!player) {
    debug("Couldn't find video player");
    // TODO: register some state for the UI to display the issue
  }

  return player;
}

//------------------------------------------------------------------------------

function extractEventData(event) {
  // Need to evaluate non-enumerables: https://stackoverflow.com/a/48055076
  function evalSingleProp(parent, prop) {
    Object.defineProperty(parent, prop, {
      value: parent[prop],
      enumerable: true,
      configurable: true,
    });
  }

  evalSingleProp(event, 'srcElement');

  const props = ['currentTime', 'duration', 'playbackRate'];
  props.forEach(prop => {
    evalSingleProp(event.srcElement, prop);
  });

  return event.target;
}

function addVideoListeners(player) {
  // TODO: hostRequired should default to true once that's implemented
  function sendVideoEvent(socketEvent, hostRequired = true) {
    return event => {
      // debug(event);
      const state = store.getState();
      const { isHost } = state.party;
      const { roomId } = state.party;
      const eventData = extractEventData(event);

      const payload = { eventData, roomId };

      if (hostRequired && isHost) {
        debug(`Host emitting ${socketEvent}`);
        socket.emit(socketEvent, payload);
      } else if (!hostRequired) {
        debug(`User emitting ${socketEvent}`);
        socket.emit(socketEvent, payload);
      }
    };
  }

  player.onplay = sendVideoEvent(SocketEvents.VIDEO_PLAY);
  player.onpause = sendVideoEvent(SocketEvents.VIDEO_PAUSE);
  player.onseeked = sendVideoEvent(SocketEvents.VIDEO_SEEKED);
  player.onprogress = sendVideoEvent(SocketEvents.VIDEO_PROGRESS, false);
}

//------------------------------------------------------------------------------

function attachToVideoPlayer() {
  const videoPlayer = findVideoPlayer();
  addVideoListeners(videoPlayer);
}

//------------------------------------------------------------------------------

attachToVideoPlayer();
// TODO: need to call attachToVideoPlayer every time URL_CHANGE occurs
