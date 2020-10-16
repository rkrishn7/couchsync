import React from 'react';
import { Box, Flex } from 'rebass';
import styled from '@root/style/styled';

import { connect, ConnectedProps } from 'react-redux';
import { StoreState } from '@contentScript/store';

interface MessageCellProps {
  isOwnMessage?: boolean;
  message: string;
}

type CellProps = Pick<MessageCellProps, 'isOwnMessage'>;

const Cell = styled(Box)<CellProps>`
  min-height: 30px;
  width: 50%;
  border-radius: ${p => p.theme.radii[2]}px;
  background-color: ${p => (p.isOwnMessage ? p.theme.colors.secondary : p.theme.colors.primary)};
  padding: 5px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  text-align: ${p => (p.isOwnMessage ? 'right' : 'left')};
`;

type MessageRowProps = Pick<MessageCellProps, 'isOwnMessage'>;

const MessageRow = styled(Flex)<MessageRowProps>`
  flex-direction: row;
  width: 100%;
  margin-top: 2px;
  margin-bottom: 2px;
  justify-content: ${p => (p.isOwnMessage ? 'flex-end' : 'flex-start')};
`;

const mapState = (state: StoreState) => {
  return {
    messages: state.chat.messages,
    chatEnabled: state.chat.enabled,
  };
};

const connector = connect(mapState);

type ReduxProps = ConnectedProps<typeof connector>;

const MessageCell: React.FC<ReduxProps & MessageCellProps> = ({ isOwnMessage, message }) => {
  return (
    <MessageRow isOwnMessage={isOwnMessage}>
      <Cell isOwnMessage={isOwnMessage}>{message}</Cell>
    </MessageRow>
  );
};

export default connector(MessageCell);
