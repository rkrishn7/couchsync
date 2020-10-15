import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Box, Card, Flex, Heading } from 'rebass';
import { toggleChat } from '@contentScript/actions/chat';
import { ChromeRuntimeMessages } from '@root/lib/constants';
import styled from '../style/styled';
import theme from '../style/theme';
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

const BrandContainer = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

const TestButton = styled.button`
  width: 30px;
  height: 30px;
  margin-right: 3px;
  margin-left: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: pink;
  border: none;
  outline: none;
  color: #909090;
  transition: all 0.2s ease-in-out;
  &:active {
    transform: scale(0.9);
  }
  &:hover {
    cursor: pointer;
    color: ${p => p.theme.colors.secondary};
  }
`;

/*
chrome.runtime.onMessage.addListener(message => {
  if (message.name === 'oopsie') {
    console.log('Popup: received toggle chat');
  }
});
*/

/**
 * @see https://developer.chrome.com/apps/messaging
 */
const handleToggleChat = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0] && tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { name: ChromeRuntimeMessages.TOGGLE_CHAT }, () => {
        store.dispatch(toggleChat());
      });
    }
  });
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Backing>
          <BrandContainer>
            <Heading color="primary">Couch Sync</Heading>
            <TestButton onClick={handleToggleChat}>Show Chat</TestButton>
          </BrandContainer>
        </Backing>
      </Root>
    </ThemeProvider>
  );
}

export default App;
