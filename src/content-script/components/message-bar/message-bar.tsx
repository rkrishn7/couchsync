import React, { useState } from 'react';
import { Card, Flex } from 'rebass';
import styled from '@root/style/styled';
import { Input } from '@rebass/forms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faLaughBeam, faBellSlash } from '@fortawesome/free-solid-svg-icons';

import { connect, ConnectedProps } from 'react-redux';
import { sendMessage, toggleNotifications } from '@contentScript/actions/chat';
import { StoreState } from '@contentScript/store';

const Container = styled(Card)`
  padding-bottom: 2px;
  border-radius: ${p => p.theme.radii[2]}px;
  border: 0.5px solid ${p => p.theme.colors.grey};
  margin: 4px;
`;

const ChatInput = styled(Input)`
  flex: 1;
  border-radius: ${p => p.theme.radii[2]}px;
  font-size: 14px;
  font-family: ${p => p.theme.fonts.body};
  border-color: ${p => p.theme.colors.greyLight};
  &:hover {
    border-color: ${p => p.theme.colors.greyDark};
  }
  &:focus {
    border-color: ${p => p.theme.colors.secondary};
  }
  outline: none;
`;

interface ToolbarButtonProps {
  selected?: boolean;
}

const ToolbarButton = styled.button<ToolbarButtonProps>`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  outline: none;
  color: ${p => (p.selected ? p.theme.colors.secondary : '#909090')};
  transition: all 0.2s ease-in-out;
  &:active {
    transform: scale(0.9);
  }
  &:hover {
    cursor: pointer;
    color: ${p => p.theme.colors.secondary};
  }
`;

const mapState = (state: StoreState) => {
  return {
    chatEnabled: state.chat.enabled,
    notificationsEnabled: state.chat.notificationsEnabled,
  };
};

const mapDispatch = {
  sendMessage: (content: string) => sendMessage(content),
  toggleNotifications,
};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

const MessageBar: React.FC<ReduxProps> = ({ chatEnabled, sendMessage, notificationsEnabled, toggleNotifications }) => {
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = document.getElementById('chatInput');

  const handleSendMessage = () => {
    if (message) {
      sendMessage(message);
      inputRef.value = "";
      setMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter'){
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return !chatEnabled ? null : (
    <Container>
      <Flex flexDirection="column">
        <Flex flexDirection="row">
          <ChatInput placeholder="send a message..." id={"chatInput"} onChange={handleInputChange} onKeyPress={handleKeyPress} />
          {/* Send Message */}
          <ToolbarButton>
            <FontAwesomeIcon icon={faPaperPlane} size="lg" onClick={handleSendMessage} />
          </ToolbarButton>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex flexDirection="row">
            {/* Emojis */}
            <ToolbarButton>
              <FontAwesomeIcon icon={faLaughBeam} size="lg" />
            </ToolbarButton>
            {/* Mute Notifications */}
            <ToolbarButton selected={!notificationsEnabled} onClick={toggleNotifications}>
              <FontAwesomeIcon icon={faBellSlash} size="lg" />
            </ToolbarButton>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default connector(MessageBar);
