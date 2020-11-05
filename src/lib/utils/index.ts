export * from './debug';

/**
 * Any functions that need to access the page's `window` object must be injected
 * onto the webpage. Extensions don't have direct access to the same `window`
 * object as the page they're running on
 * @param fn
 */
export const inject = (fn: () => void) => {
  const script = document.createElement('script');
  script.text = `(${fn.toString()})();`;
  document.documentElement.appendChild(script);
};

export const isValidExtensionUrl = (url: string) => {
  return url.match(/^.*:\/\/.*.youtube.com\/watch.*$/);
};

export const disableAutoplay = () => {
  const autoPlayBtn = document.getElementsByClassName(
    'style-scope ytd-compact-autoplay-renderer'
  )[3] as HTMLInputElement;
  if (autoPlayBtn.getAttribute('aria-pressed') === 'true') {
    autoPlayBtn.click();
  }
  autoPlayBtn.setAttribute('disabled', 'disabled');
  const autoPlayTxt = document.getElementsByClassName('style-scope ytd-compact-autoplay-renderer')[2] as HTMLElement;
  autoPlayTxt.innerText = 'Autoplay Disabled when in Party';
};
