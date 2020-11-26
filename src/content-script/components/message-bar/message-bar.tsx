import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Card, Flex } from 'rebass';
import { Input } from '@rebass/forms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaughBeam, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

import styled from '@root/style/styled';
import theme from '@root/style/theme';
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
  font-size: 15px;
  font-family: ${p => p.theme.fonts.body};
  border-color: ${p => p.theme.colors.greyLight};
  color: ${p => p.theme.colors.secondary};
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

const EmojiButton = styled.button`
  width: 30px;
  height: 30px;
  margin-left: 3px;
  margin-right: 3px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 22px;
  transition: all 0.2s ease-in-out;
  &:active {
    transform: scale(0.9);
  }
  &:hover {
    cursor: pointer;
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

const EMOJIS = ['😁', '😂', '😫', '😡', '🙂'];

const MessageBar: React.FC<ReduxProps> = ({ chatEnabled, sendMessage, notificationsEnabled, toggleNotifications }) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();

    if (message) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleEmojiClick = (val: string) => setMessage(`${message} ${val} `);

  return !chatEnabled ? null : (
    <Container>
      <Flex flexDirection="column">
        <Flex flexDirection="row">
          <ChatInput
            placeholder="send a message..."
            onChange={handleInputChange}
            value={message}
            onKeyPress={handleSubmit}
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex flexDirection="row">
            {/* Emojis */}
            <ToolbarButton data-tip data-for="happyFace">
              <FontAwesomeIcon icon={faLaughBeam} size="lg" />
            </ToolbarButton>
            {/* Mute Notifications */}
            <ToolbarButton selected={!notificationsEnabled} onClick={toggleNotifications}>
              <FontAwesomeIcon icon={faBellSlash} size="lg" />
            </ToolbarButton>

            <ReactTooltip
              id="happyFace"
              place="right"
              effect="solid"
              delayUpdate={500}
              delayHide={500}
              backgroundColor={theme.colors.primary}>
              {EMOJIS.map((val, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <EmojiButton key={i} onClick={() => handleEmojiClick(val)}>
                  {val}
                </EmojiButton>
              ))}
            </ReactTooltip>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default connector(MessageBar);
