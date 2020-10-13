import { CONTENT_SCRIPT_ENABLED_REQUEST, CONTENT_SCRIPT_ENABLED_RESPONSE } from '@root/constants/chrome';

/**
 * More information on background scripts
 * @see https://developer.chrome.com/extensions/background_pages
 */

/**
 * We need to programmatically inject the content script here
 * to account for client-side navigation.
 */
chrome.webNavigation.onHistoryStateUpdated.addListener(
  ({ tabId }) => {
    chrome.tabs.sendMessage(tabId, CONTENT_SCRIPT_ENABLED_REQUEST, response => {
      if (response === CONTENT_SCRIPT_ENABLED_RESPONSE) return;

      // If the content script isn't already enabled, inject it and its associated CSS
      chrome.tabs.executeScript(tabId, { file: 'static/js/contentScript.js' });
      chrome.tabs.insertCSS(tabId, { file: 'static/css/contentScript.css' });
    });
  },
  {
    url: [
      {
        hostSuffix: '.youtube.com',
        pathPrefix: '/watch',
      },
    ],
  }
);
