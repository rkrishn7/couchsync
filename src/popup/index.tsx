import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';
import Popup from './popup';

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Popup />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
