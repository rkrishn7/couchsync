export * from './debug';

/**
 * Any functions that need to access the page's `window` object must be injected
 * onto the webpage. Extensions don't have direct access to the same `window`
 * object as the page they're running on
 * @param fn
 */
export const inject = (fn: (() => void) | string) => {
  const script = document.createElement('script');
  script.text = `(${fn.toString()})();`;
  document.documentElement.appendChild(script);
};

export const isValidExtensionUrl = (url: string) => {
  return url.match(/^.*:\/\/.*.youtube.com\/watch.*$/);
};
