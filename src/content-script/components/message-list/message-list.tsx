import React from 'react';
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
  return (
    <Container>
      {messages?.map(({ content, isOwnMessage }) => (
        <MessageCell message={content} isOwnMessage={isOwnMessage} />
      ))}
    </Container>
  );
};

export default connector(MessageList);
