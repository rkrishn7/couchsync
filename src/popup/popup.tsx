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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Root>
          <Brand
            mb={2}
            color="white"
            headingProps={{ fontWeight: 600 }}
            backgroundColor="primary"
            width="100%"
            padding={2}
          />
          <Entry />
        </Root>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
