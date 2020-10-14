import { HIDE_CONTENT_SCRIPT_HTML } from '@root/lib/constants/chrome';

import { hideContentScriptHtml } from './handlers';

chrome.runtime.onMessage.addListener(message => {
  switch (message.name) {
    case HIDE_CONTENT_SCRIPT_HTML:
      hideContentScriptHtml();
      break;
    default:
  }
});
