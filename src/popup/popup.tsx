import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Box, Card } from 'rebass';
import { Provider as ReduxProvider } from 'react-redux';

import { Brand } from '@root/components/brand';
import styled from '@root/style/styled';
import theme from '@root/style/theme';

import { Entry } from '@popup/views/entry';
// import '@popup/listeners';
import '@popup/setup';
import './popup.css';
import store from './store';

const Root = styled(Box)`
  background-color: ${p => p.theme.colors.muted};
  padding: ${p => p.theme.space[2]}px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Backing = styled(Card)`
  width: 100%;
  height: 100%;
  border-radius: ${p => p.theme.radii[1]}px;
  display: flex;
  flex-direction: column;
  padding: ${p => p.theme.space[2]}px;
`;

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Root>
          <Backing>
            <Brand mb={2} color="secondary" />
            <Entry />
          </Backing>
        </Root>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
