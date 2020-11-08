import React from 'react';
import { Card, Flex, Text } from 'rebass';
import styled from '@root/style/styled';
import { Brand } from '@root/components/brand';
import { Animate } from '@root/components/animate';
import theme from '@root/style/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';

import { connect, ConnectedProps } from 'react-redux';
import { StoreState } from '@contentScript/store';
import { MessageBar } from '@contentScript/components/message-bar';
import { MessageList } from '@contentScript/components/message-list';
import { toggleChat } from '@contentScript/actions/chat';
import { useNotifications } from '@contentScript/hooks/use-notifications';

const ChatContainer = styled(Card)<{ enabled: boolean }>`
  width: 300px;
  height: 350px;
  display: flex;
  flex-direction: column;
  border-radius: ${p => p.theme.radii[2]}px;
  padding: 0px;
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
  border: 1px solid white;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const HeaderContainer = styled(Flex)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid ${p => p.theme.colors.grey};
  box-shadow: 0px 5px 20px -15px rgba(0, 0, 0, 0.7);
`;

const mapState = (state: StoreState) => {
  return {
    chatEnabled: state.chat.enabled,
    partyId: state.party.id,
    partyUsers: state.party.users,
  };
};

const mapDispatch = {
  toggleChat: () => toggleChat(),
};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

const Chat: React.FC<ReduxProps> = ({ chatEnabled, partyId, toggleChat, partyUsers }) => {
  // Subscribe to notifications
  useNotifications();

  return !partyId ? null : (
    <Flex flexDirection="column" alignItems="flex-end">
      <Animate show={chatEnabled} type="popOut" duration={100}>
        <ChatContainer enabled={chatEnabled}>
          <HeaderContainer padding={2}>
            <Flex flexDirection="row" alignItems="center">
              <FontAwesomeIcon
                icon={faUsers}
                color={theme.colors.primary}
                size="2x"
                style={{ paddingBottom: '1px', marginRight: '5px' }}
              />
              <Text color="primary" fontSize={1}>
                {partyUsers.length}
              </Text>
            </Flex>
            <Brand headingProps={{ fontWeight: 600 }} />
          </HeaderContainer>
          <Flex flex={3} overflowY="scroll" padding={2}>
            <MessageList />
          </Flex>
          <MessageBar />
        </ChatContainer>
      </Animate>
      <ChatButton onClick={toggleChat}>
        <FontAwesomeIcon icon={chatEnabled ? faTimes : faComment} color="white" size="2x" />
      </ChatButton>
    </Flex>
  );
};

export default connector(Chat);
