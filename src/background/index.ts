/**
 * More information on background scripts
 * @see https://developer.chrome.com/extensions/background_pages
 * 
 * Don't know how to currently handle routing with pushState() (e.g. client side routing)

 * We need to check if the content script is enabled here during client-side navigation.
 * If it's running, and we're not on a valid target page, hide the content.
chrome.webNavigation.onHistoryStateUpdated.addListener(({ url }) => {
  if (url.match(.*youtube.com\/watch.)) {
    chrome.tabs.executeScript({ file: 'static/js/contentScript.js' });
    chrome.tabs.insertCSS({ file: 'static/css/contentScript.css' });
  }
});
*/
