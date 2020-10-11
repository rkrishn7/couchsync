import React from 'react';
import { Button, Card } from 'rebass';
import styled from '@root/style/styled';
import { Input } from '@rebass/forms';
import { useTheme } from 'emotion-theming'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faLaughBeam, faBellSlash, faTimes } from '@fortawesome/free-solid-svg-icons';

const ChatContainer = styled(Card)`
  min-width: 300px;
  height: 50px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
`;

const ChatInput = styled(Input)`
  flex: 1;
  width: 200px;
  border-radius: 4px;
  font-size: 14px;
  font-family: ${p => p.theme.fonts.body};
  border-color: ${p => p.theme.colors.secondary};
  &:focus {
    border-width: 2px;
  }
  outline: none;
`;

const ToolbarButton = styled(Button)`
  transition: all 0.2s ease-in-out;
  max-width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none !important;
  outline: none !important;
  &:active {
    transform: scale(0.9);
  }
  &:hover {
    cursor: pointer;
  }
  margin-right: 5px;
  margin-left: 5px;
`;

const CloseButton = styled.button`
  max-width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  max-width: 48px;
  border: none !important;
  outline: none !important;
  &:active {
    transform: scale(0.9);
  }
  &:hover {
    cursor: pointer;
  }
  margin-right: 5px;
  margin-left: 5px;
  background-color: transparent;
`;

export const MessageBar: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const theme: any = useTheme();
  return (
    <ChatContainer>
      <CloseButton>
        <FontAwesomeIcon icon={faTimes} size="2x" color={theme.colors.secondary} />
      </CloseButton>
      <ChatInput placeholder="send a message..." />
      <ToolbarButton variant="secondary">
        <FontAwesomeIcon icon={faPaperPlane} size="1x" color="white" />
      </ToolbarButton>
      <ToolbarButton variant="secondary">
        <FontAwesomeIcon icon={faLaughBeam} size="1x" color="white" />
      </ToolbarButton>
      <ToolbarButton variant="secondary">
        <FontAwesomeIcon icon={faBellSlash} size="1x" color="white" />
      </ToolbarButton>
    </ChatContainer>
  );
};
