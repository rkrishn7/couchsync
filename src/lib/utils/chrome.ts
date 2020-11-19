import { ChromeRuntimeMessages } from '../constants';

interface RuntimeMessage {
  name: ChromeRuntimeMessages;
  data?: Record<string, any>;
}

export const sendActiveTabMessage = (message: RuntimeMessage, res?: (ack: { data: any }) => void) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id!, message, res);
    }
  });
};
