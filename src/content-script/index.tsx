import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import theme from '@root/style/theme';
import { MessageBar } from '@contentScript/components/message-bar';

const Main: React.FC = () => (
  <ThemeProvider theme={theme}>
    <MessageBar />
  </ThemeProvider>
);

const app = document.createElement('div');
app.id = 'extension-panel-root';
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
