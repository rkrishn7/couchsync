import { ChromeRuntimeMessages, PopupViews } from '@root/lib/constants';

import { setPopupView } from '@popup/actions/popup';
import store from '@popup/store';

chrome.runtime.onMessage.addListener(message => {
  switch (message.name) {
    case ChromeRuntimeMessages.ENABLE_POPUP_INTERACTION:
      store.dispatch(setPopupView(PopupViews.LOADING));
      break;
    case ChromeRuntimeMessages.DISABLE_POPUP_INTERACTION:
      store.dispatch(setPopupView(PopupViews.INVALID_URL));
      break;
    default:
  }
});
