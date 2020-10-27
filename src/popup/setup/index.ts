import { isValidExtensionUrl } from '@root/lib/utils';
import { ChromeRuntimeMessages, PopupViews } from '@root/lib/constants';

import store from '@popup/store';
import { setPopupView } from '@popup/actions/popup';
import { setParty } from '@popup/actions/party';

import queryString from 'query-string';

/**
 * Set up the initial popup state
 * @see https://developer.chrome.com/apps/messaging
 */
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  if (tabs[0] && isValidExtensionUrl(tabs[0].url!)) {
    const {
      query: { couchSyncRoomId },
    } = queryString.parseUrl(tabs[0].url!);

    chrome.tabs.sendMessage(
      tabs[0].id!,
      { name: ChromeRuntimeMessages.GET_PARTY_DETAILS },
      ({ data: { id, joinUrl, hash, isHost } }) => {
        if (id && joinUrl) {
          store.dispatch(
            setParty({
              id,
              joinUrl,
              hash,
              isHost,
            })
          );
          store.dispatch(setPopupView(PopupViews.IN_PARTY));
        } else if (couchSyncRoomId) {
          store.dispatch(setPopupView(PopupViews.JOIN_PARTY));
        } else {
          store.dispatch(setPopupView(PopupViews.CREATE_PARTY));
        }
      }
    );
  } else {
    store.dispatch(setPopupView(PopupViews.INVALID_URL));
  }
});
