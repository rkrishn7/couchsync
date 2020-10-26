import { ChromeRuntimeMessages, SocketEvents, WindowMessages } from '@root/lib/constants';
import { debug, inject } from '@root/lib/utils';
import { toggleChat } from '@contentScript/actions/chat';
import { setRoomId, setJoinUrl } from '@contentScript/actions/party';
import socket from '@popup/socket';
import store from '@contentScript/store';

/**
 * Our content script has a different browsing context than that of the current webpage
 * We can use the postMessage API to circumvent reference restrictions
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */
window.addEventListener('message', event => {
  const storeState = store.getState();
  switch (event.data.name) {
    case WindowMessages.URL_CHANGE:
      debug(event.data.name);
      debug(document.location.href);
      // check to see if user is host before switching URLS
      if (storeState.party.isHost && storeState.party.roomId != null) {
        store.dispatch(setRoomId(storeState.party.roomId));
        const newURL = `${document.location.href}&couchSyncRoomId=${storeState.party.roomId}`;
        socket.emit(SocketEvents.URL_CHANGE, `URL Changed in room ${storeState.party.roomId}`);
        store.dispatch(setJoinUrl(newURL)); // this is kinda hacky but it works
      }
      break;
    case WindowMessages.PAGE_UNLOAD:
      debug(event.data);
      break;
    default:
      debug('Unknown Window Message Name');
  }
});

// CANNOT REFERENCE ANY VARIABLES FROM OUTER SCOPE (They will not resolve)
function addNavigationListeners() {
  /**
   * This appears to be the name of the event triggered when we navigate client-side
   * on Youtube
   * @see https://stackoverflow.com/a/54389066
   */
  window.addEventListener('yt-page-data-updated', function () {
    window.postMessage({ name: 'URL_CHANGE' }, '*');
  });
  /**
   * This event fires before the document and page resources are unloaded
   * (e.g. before we leave/reload a page)
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
   */
  window.addEventListener('beforeunload', function () {
    window.postMessage({ name: 'PAGE_UNLOAD' }, '*');
  });
}

/**
 * Injects the window listeners into the page's frame
 */
(function setup() {
  inject(addNavigationListeners);
})();

/**
 * Handles teardown of content script.
 * Clean up any listeners, sockets, visual components here.
 */
function teardown() {
  const extensionRoot = document.getElementById('extension-panel-root');
  if (extensionRoot) {
    extensionRoot.style.display = 'none';
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const storeState = store.getState();
  switch (message.name) {
    case ChromeRuntimeMessages.HIDE_CONTENT_SCRIPT_HTML:
      teardown();
      break;
    case ChromeRuntimeMessages.TOGGLE_CHAT:
      store.dispatch(toggleChat());
      sendResponse();
      break;
    case ChromeRuntimeMessages.GET_PARTY_DETAILS:
      sendResponse({ data: { roomId: storeState.party.roomId, joinUrl: storeState.party.joinUrl } });
      break;
    case ChromeRuntimeMessages.SET_PARTY_DETAILS:
      const { roomId, joinUrl } = message.data!;
      debug(message.data);
      if (roomId) store.dispatch(setRoomId(roomId));
      if (joinUrl) store.dispatch(setJoinUrl(joinUrl));
      break;
    default:
  }
});
