import React, { useState } from 'react';
import { Card, Flex } from 'rebass';
import styled from '@root/style/styled';
import { Brand } from '@root/components/brand';
import { Animate } from '@root/components/animate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { connect, ConnectedProps } from 'react-redux';
import { StoreState } from '@contentScript/store';
import { MessageBar } from '@contentScript/components/message-bar';
import { MessageList } from '@contentScript/components/message-list';
import { ChangeName } from '@contentScript/components/change-name';
import { ChangeAvatar } from '@contentScript/components/change-avatar';
import { toggleChat } from '@contentScript/actions/chat';

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
  border: 2px solid white;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const ChatBanner = styled(Brand)`
  background-color: ${p => p.theme.colors.primary};
  border-top-right-radius: ${p => p.theme.radii[2]}px;
  border-top-left-radius: ${p => p.theme.radii[2]}px;
  border: 1px solid ${p => p.theme.colors.secondary};
  box-shadow: 0px 5px 20px -15px rgba(0, 0, 0, 0.7);
`;

const SettingButton = styled.button`
  flex: 1;
  background-color: ${p => p.theme.colors.primary};
  border: 1px solid ${p => p.theme.colors.secondary};
  color: white;
  font-size: 14px;
  font-family: ${p => p.theme.fonts.body};
  opacity: 0.8;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${p => p.theme.colors.secondary};
  }
`;

const mapState = (state: StoreState) => {
  return {
    chatEnabled: state.chat.enabled,
    partyId: state.party.id,
  };
};

const mapDispatch = {
  toggleChat: () => toggleChat(),
};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

const Chat: React.FC<ReduxProps> = ({ chatEnabled, partyId, toggleChat }) => {
  const [isChat, setIsChat] = useState<boolean>(true);

  const handleClickChat = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsChat(true);
  };

  const handleClickSettings = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsChat(false);
  };

  return !partyId ? null : (
    <Flex flexDirection="column" alignItems="flex-end">
      <Animate show={chatEnabled} type="popOut" duration={100}>
        <ChatContainer enabled={chatEnabled}>
          <ChatBanner headingProps={{ fontWeight: 600 }} color="white" padding="7px" />
          <Flex flexDirection="row" alignItems="center" justifyContent="center">
            <SettingButton type="button" onClick={handleClickChat}>
              Chat
            </SettingButton>
            <SettingButton type="button" onClick={handleClickSettings}>
              Settings
            </SettingButton>
          </Flex>
          {isChat ? (
            <>
              <Flex flex={3} overflowY="scroll" margin={2}>
                <MessageList />
              </Flex>
              <MessageBar />
            </>
          ) : (
            <>
              <Flex flex={3} margin={2}>
                <ChangeName />
              </Flex>
              <Flex flex={3} margin={2}>
                <ChangeAvatar />
              </Flex>
            </>
          )}
        </ChatContainer>
      </Animate>
      <ChatButton onClick={toggleChat}>
        <FontAwesomeIcon icon={chatEnabled ? faTimes : faComment} color="white" size="2x" />
      </ChatButton>
    </Flex>
  );
};

export default connector(Chat);
