import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Box } from 'rebass';
import { Provider as ReduxProvider } from 'react-redux';

import { Header } from '@popup/components/header';
import styled from '@root/style/styled';
import theme from '@root/style/theme';

import { Entry } from '@popup/views/entry';
import '@popup/setup';
import './popup.css';
import store from './store';

const Root = styled(Box)`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Root>
          <Header />
          <Entry />
        </Root>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
