import { debug } from '@root/lib/utils';
import socket from '@contentScript/socket';
import store from '@contentScript/store';
import { SocketEvents, VideoSocketEvents } from '@root/lib/constants/socket';
import { VideoEvent, VideoEventData } from '@root/lib/types/video';
import { MAX_DESYNC_SEC } from '@root/lib/constants/video';
import { SupportedPlatforms } from '@root/lib/types';

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

function addVideoListeners(player: HTMLVideoElement) {
  // TODO: Once implemented, include communism/facism check
  function sendVideoEvent(socketEvent: VideoSocketEvents) {
    return (event: any) => {
      const state = store.getState();
      const { isHost, hash } = state.party;

      // if party not created, don't send anything
      if (!hash) return;

      // construct payload
      const { paused, currentTime, duration, playbackRate } = event.target;
      const eventData: VideoEventData = { eventType: socketEvent, paused, currentTime, playbackRate, duration };
      const payload: VideoEvent = { partyHash: hash, eventData };

      // send payload
      if (isHost) {
        debug(`Host emitting ${socketEvent}`);
        socket.emit(SocketEvents.VIDEO_EVENT, payload);
      }
    };
  }

  player.onplay = sendVideoEvent(VideoSocketEvents.VIDEO_PLAY);
  player.onpause = sendVideoEvent(VideoSocketEvents.VIDEO_PAUSE);
  player.onseeked = sendVideoEvent(VideoSocketEvents.VIDEO_SEEKED);
  player.onprogress = sendVideoEvent(VideoSocketEvents.VIDEO_PROGRESS);

  setInterval(function sendProgressOnPause() {
    const { isHost } = store.getState().party;
    if (isHost && player.paused) {
      sendVideoEvent(VideoSocketEvents.VIDEO_PROGRESS);
    }
  }, 1000);
}

function addVideoSocketListeners(player: HTMLVideoElement) {
  socket.on(SocketEvents.VIDEO_EVENT, (data: VideoEventData) => {
    // match player play/pause state
    if (data.paused) player.pause();
    else player.play();

    // match player playback speed
    player.playbackRate = data.playbackRate;

    // resync if needed and not host. handles seek events
    if (Math.abs(player.currentTime - data.currentTime) > MAX_DESYNC_SEC) {
      player.currentTime = data.currentTime;
    }
  });
}

export function attachToVideoPlayer() {
  const videoPlayer = findVideoPlayer();
  if (videoPlayer) {
    addVideoListeners(videoPlayer);
    addVideoSocketListeners(videoPlayer);
  }
}
