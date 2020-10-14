export const hideContentScriptHtml = () => {
  const extensionRoot = document.getElementById('extension-panel-root');
  if (extensionRoot) {
    extensionRoot.style.display = 'none';
  }
};
