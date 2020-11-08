import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import theme from '@root/style/theme';
import { Chat } from '@contentScript/components/chat';
import store from '@contentScript/store';
import '@contentScript/listeners';
import { ToastProvider } from 'react-toast-notifications';
import { Provider as ReduxProvider } from 'react-redux';

const Main: React.FC = () => (
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <ToastProvider placement="top-left" autoDismiss autoDismissTimeout={2000}>
        <Chat />
      </ToastProvider>
    </ThemeProvider>
  </ReduxProvider>
);

const app = document.createElement('div');
app.id = 'couch-sync-extension__root';
document.body.append(app);
ReactDOM.render(<Main />, app);
