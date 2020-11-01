import { debug } from '@root/lib/utils';
import socket from '@contentScript/socket';
import store from '@contentScript/store';
import { SocketEvents } from '@root/lib/constants/socket';
import { SupportedPlatforms } from '@root/lib/types';

//------------------------------------------------------------------------------

// functions for each platform that can be run to get their video
const videoLocators = {
  youtube: (): HTMLVideoElement | null => {
    return document.querySelector('.html5-main-video');
  },
  vimeo: (): HTMLVideoElement | null => {
    return document.querySelector('video');
  },
  default: (): HTMLVideoElement | null => {
    return document.querySelector('video');
  },
};

//------------------------------------------------------------------------------

function findVideoPlayer(): HTMLVideoElement | null {
  const url = window.location.href;
  let player = null;

  for (const platform of Object.values(SupportedPlatforms)) {
    if (url.includes(platform)) {
      debug(`Located ${platform} video element`);
      player = videoLocators[platform]();
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

function addVideoListeners(player: HTMLVideoElement) {
  // TODO: hostRequired should default to true once that's implemented
  function sendVideoEvent(socketEvent: SocketEvents, hostRequired = false) {
    return (event: any) => {
      const state = store.getState();
      const { isHost } = state.party;
      const { id } = state.party;
      const { currentTime, duration, playbackRate } = event.target;

      const payload = { id, currentTime, duration, playbackRate };

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
  if (videoPlayer) addVideoListeners(videoPlayer);
}

//------------------------------------------------------------------------------

attachToVideoPlayer();
// TODO: need to call attachToVideoPlayer every time URL_CHANGE occurs
