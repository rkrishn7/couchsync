import socket from '@contentScript/socket';
import store from '@contentScript/store';

import { parseUrl } from 'query-string';
import { navigateToUrl } from '@contentScript/utils/transitions';
import { SocketEvents } from '@root/lib/constants/socket';
import { VideoEvent, VideoEventData } from '@root/lib/types/video';
import { MAX_DESYNC_SEC } from '@root/lib/constants/video';
import { SupportedPlatforms } from '@root/lib/types';
import { debug } from '@root/lib/utils';

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

function getPlayerInfo(player: HTMLVideoElement): VideoEventData {
  const videoId = parseUrl(document.location.href).query.v;
  const { paused, currentTime, duration, playbackRate } = player;
  return { paused, currentTime, duration, playbackRate, videoId };
}

function addVideoListeners(player: HTMLVideoElement) {
  // TODO: Once implemented, include communism/facism check
  function sendVideoEvent() {
    const state = store.getState();
    const { isHost, hash } = state.party;

    // if party not created, don't send anything
    if (!hash) return;

    // construct payload
    const eventData: VideoEventData = getPlayerInfo(player);
    eventData.isHost = isHost;
    const payload: VideoEvent = { partyHash: hash, eventData };

    // send payload
    if (isHost) {
      socket.emit(SocketEvents.VIDEO_EVENT, payload);
    }
  }

  player.onplay = sendVideoEvent;
  player.onpause = sendVideoEvent;
  player.onseeked = sendVideoEvent;

  setInterval(function sendProgressOnPause() {
    sendVideoEvent();
  }, 1000);
}

function addVideoSocketListeners(player: HTMLVideoElement) {
  socket.on(SocketEvents.VIDEO_EVENT, (hostPlayer: VideoEventData) => {
    // ignore non-host payloads
    if (!hostPlayer.isHost) return;

    // get current user's player data
    const clientPlayer = getPlayerInfo(player);

    // match player play/pause state
    if (hostPlayer.paused) player.pause();
    else player.play();

    // match player playback speed
    player.playbackRate = hostPlayer.playbackRate;

    // resync if needed and not host. handles seek events
    if (Math.abs(player.currentTime - hostPlayer.currentTime) > MAX_DESYNC_SEC) {
      player.currentTime = hostPlayer.currentTime;
    }

    // match player videos
    if (clientPlayer.videoId !== hostPlayer.videoId) {
      const roomId = parseUrl(document.location.href).query.couchSyncRoomId;
      navigateToUrl(`youtube.com/watch?v=${hostPlayer.videoId}&couchSyncRoomId=${roomId}`);
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
