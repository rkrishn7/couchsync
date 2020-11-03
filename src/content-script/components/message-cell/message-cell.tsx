import React from 'react';
import { Box, Flex, Text } from 'rebass';
import styled from '@root/style/styled';

import { connect, ConnectedProps } from 'react-redux';
import { StoreState } from '@contentScript/store';

interface MessageCellProps {
  isOwnMessage?: boolean;
  message: string;
  avatarUrl: string;
  userName: string;
}

type CellProps = Pick<MessageCellProps, 'isOwnMessage'>;
type AvatarProps = Pick<MessageCellProps, 'isOwnMessage'>;

const Cell = styled(Box)<CellProps>`
  min-height: 30px;
  width: 100%;
  border-radius: ${p => p.theme.radii[2]}px;
  border-top-left-radius: ${p => (p.isOwnMessage ? p.theme.radii[2] : 0)}px;
  border-top-right-radius: ${p => p.theme.radii[2]}px;
  border-bottom-right-radius: ${p => (p.isOwnMessage ? 0 : p.theme.radii[2])}px;
  border-bottom-left-radius: ${p => p.theme.radii[2]}px;
  background-color: ${p => (p.isOwnMessage ? p.theme.colors.secondary : p.theme.colors.primary)};
  padding: 5px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  word-wrap: break-word;
  text-align: ${p => (p.isOwnMessage ? 'right' : 'left')};
  box-shadow: ${p => (p.isOwnMessage ? '-' : '')}10px 11px 20px -12px rgba(0, 0, 0, 0.75);
`;

export const Avatar = styled.img<AvatarProps>`
  width: 24px;
  height: 24px;
  margin-left: ${p => p.theme.space[1]}px;
  margin-right: ${p => p.theme.space[1]}px;
  border-radius: 9999px;
`;

type MessageRowProps = Pick<MessageCellProps, 'isOwnMessage'>;

const MessageRow = styled(Flex)<MessageRowProps>`
  flex-direction: ${p => (p.isOwnMessage ? 'row' : 'row-reverse')};
  width: 100%;
  margin-top: 2px;
  margin-bottom: 2px;
  justify-content: flex-end;
  align-items: center;
`;

const mapState = (state: StoreState) => {
  return {
    messages: state.chat.messages,
    chatEnabled: state.chat.enabled,
  };
};

const connector = connect(mapState);

type ReduxProps = ConnectedProps<typeof connector>;

const MessageCell: React.FC<ReduxProps & MessageCellProps> = ({ isOwnMessage, message, avatarUrl, userName }) => {
  return (
    <MessageRow isOwnMessage={isOwnMessage}>
      <Flex flexDirection="column" width="50%">
        <Text fontSize="9px" color="greyDark" textAlign={isOwnMessage ? 'right' : 'left'}>
          {userName}
        </Text>
        <Cell isOwnMessage={isOwnMessage}>{message}</Cell>
      </Flex>
      <Avatar src={avatarUrl} />
    </MessageRow>
  );
};

export default connector(MessageCell);
