import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Box, Card } from 'rebass';
import { Provider as ReduxProvider } from 'react-redux';
import { enablePopup } from '@popup/actions/popup';
import { ChromeRuntimeMessages } from '@root/lib/constants';
import { Brand } from '@root/components/brand';
import { isValidExtensionUrl } from '@root/lib/utils';
import { Entry } from '@popup/views/entry';
import styled from '@root/style/styled';
import theme from '@root/style/theme';
import '@popup/listeners';
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

/**
 * Enable the popup
 * @see https://developer.chrome.com/apps/messaging
 */
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  if (tabs[0] && isValidExtensionUrl(tabs[0].url!)) {
    chrome.tabs.sendMessage(tabs[0].id!, { name: ChromeRuntimeMessages.ENABLE_POPUP_INTERACTION }, () => {
      store.dispatch(enablePopup());
    });
  }
});

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
