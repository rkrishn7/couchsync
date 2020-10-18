import { ChromeRuntimeMessages } from '@root/lib/constants';
// import { debug } from '@root/lib/utils';

import { enablePopup, disablePopup } from '@popup/actions/popup';
import store from '@popup/store';

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.name) {
    case ChromeRuntimeMessages.ENABLE_POPUP_INTERACTION:
      store.dispatch(enablePopup());
      break;
    case ChromeRuntimeMessages.DISABLE_POPUP_INTERACTION:
      store.dispatch(disablePopup());
      break;
    default:
  }
});
