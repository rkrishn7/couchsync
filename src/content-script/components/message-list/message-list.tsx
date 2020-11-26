import React, { useEffect, useRef } from 'react';
import { Flex } from 'rebass';
import styled from '@root/style/styled';

import { connect, ConnectedProps } from 'react-redux';
import { StoreState } from '@contentScript/store';
import { MessageCell } from '@contentScript/components/message-cell';

const Container = styled(Flex)`
  flex-direction: column;
  min-width: 100%;
  overflow-y: scroll;
`;

const mapState = (state: StoreState) => {
  return {
    messages: state.chat.messages,
  };
};

const connector = connect(mapState);

type ReduxProps = ConnectedProps<typeof connector>;

const MessageList: React.FC<ReduxProps> = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Container>
      {messages?.map(({ content, isOwnMessage, user }) => (
        <MessageCell message={content} isOwnMessage={isOwnMessage} userName={user.name} avatarUrl={user.avatarUrl} />
      ))}
      <div ref={messagesEndRef} />
    </Container>
  );
};

export default connector(MessageList);
