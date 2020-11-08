import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import http from '@root/lib/http';
import { sendActiveTabMessage } from '@root/lib/utils/chrome';
import { ChromeRuntimeMessages } from '@root/lib/constants';
import store from './store';
import Popup from './popup';

// Configure notifications
http.interceptors.response.use(
  response => {
    const msg = response?.data?.success;

    if (msg)
      sendActiveTabMessage({
        name: ChromeRuntimeMessages.ADD_NOTIFICATION,
        data: {
          notification: {
            title: 'Success',
            content: msg,
            type: 'success',
          },
        },
      });

    return response;
  },
  error => {
    const msg = error.response?.data?.error;

    if (msg)
      sendActiveTabMessage({
        name: ChromeRuntimeMessages.ADD_NOTIFICATION,
        data: {
          notification: {
            title: 'Error',
            content: msg,
            type: 'error',
          },
        },
      });
  }
);

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Popup />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
