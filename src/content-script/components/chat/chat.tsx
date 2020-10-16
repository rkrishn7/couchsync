import React from 'react';
import { Card, Flex } from 'rebass';
import styled from '@root/style/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { connect, ConnectedProps } from 'react-redux';
import { StoreState } from '@contentScript/store';
import { MessageBar } from '@contentScript/components/message-bar';
import { MessageList } from '@contentScript/components/message-list';
import { toggleChat } from '@contentScript/actions/chat';

const ChatContainer = styled(Card)<{ enabled: boolean }>`
  min-width: 250px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  border-radius: ${p => p.theme.radii[2]}px;
`;

const ChatButton = styled.button`
  width: 50px;
  height: 50px;
  margin-top: 5px;
  display: flex;
  border: none;
  outline: none;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.theme.colors.secondary};
  color: white;
  border-radius: 100%;
  opacity: 0.8;
  cursor: pointer;
  border: 2px solid white;

  &:hover {
    opacity: 1;
  }
`;

const ChatIcon = styled(FontAwesomeIcon)<{ chatEnabled: boolean }>`
  transition: all 0.2s linear;
  transform: ${p => (p.chatEnabled ? 'rotate(45deg)' : 'rotate(0deg)')};
`;

const mapState = (state: StoreState) => {
  return {
    chatEnabled: state.chat.enabled,
  };
};

const mapDispatch = {
  toggleChat: () => toggleChat(),
};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

const Chat: React.FC<ReduxProps> = ({ chatEnabled, toggleChat }) => {
  return (
    <Flex flexDirection="column" alignItems="flex-end">
      {chatEnabled && (
        <ChatContainer enabled={chatEnabled}>
          <Flex flex={3}>
            <MessageList />
          </Flex>
          <MessageBar />
        </ChatContainer>
      )}
      <ChatButton onClick={toggleChat}>
        <ChatIcon icon={faPlus} color="white" size="2x" chatEnabled={chatEnabled} />
      </ChatButton>
    </Flex>
  );
};

export default connector(Chat);
