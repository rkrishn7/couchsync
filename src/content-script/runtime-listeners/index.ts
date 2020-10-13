import { CONTENT_SCRIPT_ENABLED_REQUEST, CONTENT_SCRIPT_ENABLED_RESPONSE } from '@root/constants/chrome';

export const initRuntimeListeners = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === CONTENT_SCRIPT_ENABLED_REQUEST) sendResponse(CONTENT_SCRIPT_ENABLED_RESPONSE);
  });
};
