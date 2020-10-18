import { ChromeRuntimeMessages } from '@root/lib/constants';
import { isValidExtensionUrl } from '@root/lib/utils';
/**
 * More information on background scripts
 * @see https://developer.chrome.com/extensions/background_pages
 */

/**
 * These are the web navigation events we're listening to
 * - `onHistoryStateUpdated` occurs during client-side navigation
 * - `onCompleted` is fired when a document + all its resources are loaded
 * @see https://developer.chrome.com/extensions/webNavigation
 */
type WebNavigationEvent = 'onHistoryStateUpdated' | 'onCompleted';

const navigationEvents: WebNavigationEvent[] = ['onHistoryStateUpdated', 'onCompleted'];

navigationEvents.forEach(evt =>
  chrome.webNavigation[evt].addListener(({ url, frameId }) => {
    if (frameId > 0) return;
    if (isValidExtensionUrl(url)) {
      chrome.runtime.sendMessage({ name: ChromeRuntimeMessages.ENABLE_POPUP_INTERACTION });
    } else {
      chrome.runtime.sendMessage({ name: ChromeRuntimeMessages.DISABLE_POPUP_INTERACTION });
    }
  })
);
