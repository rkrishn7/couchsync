import { ChromeRuntimeMessages, WindowMessages } from '@root/lib/constants';
import { debug, inject } from '@root/lib/utils';

import { onPageNavigate } from '@contentScript/utils/transitions';
import { joinParty, createNotification } from '@contentScript/actions/party';
import { setUser } from '@contentScript/actions/user';
import store from '@contentScript/store';
import { attachToVideoPlayer } from '@contentScript/utils/player';

/**
 * Our content script has a different browsing context than that of the current webpage
 * We can use the postMessage API to circumvent reference restrictions
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */
window.addEventListener('message', event => {
  debug(event.data);
  switch (event.data.name) {
    case WindowMessages.URL_CHANGE:
      onPageNavigate();
      attachToVideoPlayer();
      break;
    default:
      debug('Unknown Window Message Name');
      break;
  }
});

// CANNOT REFERENCE ANY VARIABLES FROM OUTER SCOPE (They will not resolve)
function addNavigationListeners() {
  /**
   * This event fires when the document is fully loaded
   * Used to detect when someone leaves the party for another YT Vid
   */
  window.addEventListener('yt-navigate-finish', function () {
    window.postMessage({ name: 'URL_CHANGE' }, '*');
  });
}

/**
 * Injects the window listeners into the page's frame
 */
(function setup() {
  inject(addNavigationListeners);
})();

chrome.runtime.onMessage.addListener((message: any, _sender, sendResponse) => {
  const storeState = store.getState();
  switch (message.name) {
    case ChromeRuntimeMessages.GET_PARTY_DETAILS: {
      sendResponse({
        data: storeState.party,
      });
      break;
    }
    case ChromeRuntimeMessages.GET_USER_DETAILS: {
      sendResponse({
        data: {
          user: storeState.user,
        },
      });
      break;
    }
    case ChromeRuntimeMessages.SET_USER_DETAILS: {
      store.dispatch(setUser(message.data!.user));
      break;
    }
    case ChromeRuntimeMessages.JOIN_PARTY: {
      store
        .dispatch(joinParty(message.data!))
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .then((res: any) => sendResponse({ data: { ...res } }))
        .catch((err: any) => sendResponse({ data: { error: err.message } }));
      break;
    }
    case ChromeRuntimeMessages.ADD_NOTIFICATION: {
      store.dispatch(createNotification(message.data!.notification));
      break;
    }
    default:
  }

  /**
   * Returning `true` will keep the message channel open
   * until `sendResponse` is called.
   * @see https://developer.chrome.com/extensions/runtime#event-onMessage
   */
  return true;
});
