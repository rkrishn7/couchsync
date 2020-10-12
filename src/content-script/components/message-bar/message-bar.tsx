import React, { useState, useEffect } from 'react';
import { Card, Flex } from 'rebass';
import styled from '@root/style/styled';
import { Input } from '@rebass/forms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faLaughBeam, faBellSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useToasts } from 'react-toast-notifications';

import { connect, ConnectedProps } from 'react-redux';
import { sendMessage } from '@contentScript/actions/chat';
import { StoreState } from '@contentScript/store';

const ChatContainer = styled(Card)`
  min-width: 300px;
  padding-bottom: 2px;
  border-radius: ${p => p.theme.radii[2]}px;
`;

const ChatInput = styled(Input)`
  flex: 1;
  border-radius: ${p => p.theme.radii[2]}px;
  font-size: 14px;
  font-family: ${p => p.theme.fonts.body};
  border-color: #909090;
  &:focus {
    border-color: ${p => p.theme.colors.secondary};
  }
  outline: none;
`;

const ToolbarButton = styled.button`
  width: 30px;
  height: 30px;
  margin-right: 3px;
  margin-left: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
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

const mapState = (state: StoreState) => {
  return {
    messages: state.chat.messages,
  };
};

const mapDispatch = {
  sendMessage: (content: string) => sendMessage(content),
};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

const MessageBar: React.FC<ReduxProps> = ({ messages, sendMessage }) => {
  const { addToast, removeAllToasts } = useToasts();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (messages.length) {
      const message = messages[messages.length - 1];
      addToast(message.content, { appearance: 'success', autoDismiss: true });
    }
  }, [messages, addToast]);

  const handleSendMessage = () => {
    if (message) sendMessage(message);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <ChatContainer>
      <Flex flexDirection="column">
        <ChatInput placeholder="send a message..." onChange={handleInputChange} />
        <Flex justifyContent="space-between" alignItems="center">
          <Flex flexDirection="row">
            {/* Send Message */}
            <ToolbarButton>
              <FontAwesomeIcon icon={faPaperPlane} size="1x" onClick={handleSendMessage} />
            </ToolbarButton>
            {/* Emojis */}
            <ToolbarButton>
              <FontAwesomeIcon icon={faLaughBeam} size="1x" />
            </ToolbarButton>
            {/* Mute Notifications */}
            <ToolbarButton>
              <FontAwesomeIcon icon={faBellSlash} size="1x" />
            </ToolbarButton>
          </Flex>
          <Flex flexDirection="row">
            {/* Close */}
            <ToolbarButton>
              <FontAwesomeIcon icon={faTimes} size="1x" onClick={removeAllToasts} />
            </ToolbarButton>
          </Flex>
        </Flex>
      </Flex>
    </ChatContainer>
  );
};

export default connector(MessageBar);
