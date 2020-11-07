import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { Flex, Text } from 'rebass';

import { Avatar } from '@contentScript/components/message-cell/message-cell';
import { StoreState } from '@contentScript/store';

interface MessageNotificationProps {
  content: string;
  user: {
    name: string;
    avatarUrl: string;
  };
}

const MessageNotification: React.FC<MessageNotificationProps> = ({ content, user: { name, avatarUrl } }) => {
  return (
    <Flex flexDirection="column" width="100%" height="100%" padding={2}>
      <Flex flexDirection="row" alignItems="center" marginBottom={1}>
        <Avatar src={avatarUrl} />
        <Text fontSize="14px" fontWeight="500">
          {name}
        </Text>
      </Flex>
      <Text marginLeft={2} fontSize="12px">
        {content}
      </Text>
    </Flex>
  );
};

export const useMessageNotifications = () => {
  const { messages, notificationsEnabled } = useSelector((state: StoreState) => ({
    messages: state.chat.messages,
    notificationsEnabled: state.chat.notificationsEnabled,
  }));

  const { addToast, removeAllToasts } = useToasts();

  useEffect(() => {
    if (!messages.length) return;

    const { content, user, isOwnMessage } = messages[messages.length - 1];

    if (!isOwnMessage && notificationsEnabled)
      addToast(<MessageNotification content={content} user={user} />, {
        appearance: 'info',
      });
  }, [notificationsEnabled, messages, addToast, removeAllToasts]);
};
