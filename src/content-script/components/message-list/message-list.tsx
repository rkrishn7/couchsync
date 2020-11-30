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
  const messageRefs = useRef({} as Record<number, HTMLDivElement | null>);

  const isInViewport = (elem: HTMLDivElement | null) => {
    const bounds = elem?.getBoundingClientRect();
    if(!bounds) return true;
    return (
      bounds.top >= 0 &&
      // using a magic number of 130
      bounds.bottom <= (window.innerHeight || document.documentElement.clientHeight) - 130
    );
  };

  useEffect(() => {
    const lastMessageId = messages[messages.length - 1]?.id;
    if (lastMessageId && isInViewport(messageRefs.current[lastMessageId])) {
      console.log(isInViewport(messageRefs.current[lastMessageId]))
      messageRefs.current[lastMessageId]?.scrollIntoView(false);
    }
  }, [messages]);

  return (
    <Container>
        {messages?.map(({ content, isOwnMessage, user, id }) => (
          <MessageCell
            message={content}
            isOwnMessage={isOwnMessage}
            userName={user.name}
            avatarUrl={user.avatarUrl}
            key={id}
            ref={ref => {
              messageRefs.current[id] = ref;
            }}
          />
        ))}
    </Container>
  );
};

export default connector(MessageList);
