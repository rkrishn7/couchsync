import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { Flex, Text } from 'rebass';

import { Avatar } from '@root/components/avatar';
import { Notification } from '@root/lib/types/notification';

import { StoreState } from '@contentScript/store';
import { markNotificationSeen } from '@contentScript/actions/party';

type NotificationProps = Pick<Notification, 'title' | 'content' | 'avatar'>;

const MessageNotification: React.FC<NotificationProps> = ({ content, title, avatar }) => {
  return (
    <Flex flexDirection="column" width="100%" height="100%" padding={2}>
      <Flex flexDirection="row" alignItems="center" marginBottom={1}>
        {avatar && <Avatar src={avatar} />}
        <Text fontSize="14px" fontWeight="500">
          {title}
        </Text>
      </Flex>
      <Text ml={avatar ? 2 : 0} fontSize="12px">
        {content}
      </Text>
    </Flex>
  );
};

export const useNotifications = () => {
  const { notifications, notificationsEnabled } = useSelector((state: StoreState) => ({
    notifications: state.party.notifications,
    notificationsEnabled: state.chat.notificationsEnabled,
  }));

  const dispatch = useDispatch();

  const { addToast, removeAllToasts } = useToasts();

  useEffect(() => {
    if (!notifications.length || !notificationsEnabled) return;

    const { content, title, avatar, seen, id, type } = notifications[notifications.length - 1];

    if (!seen) {
      addToast(<MessageNotification content={content} title={title} avatar={avatar} />, {
        appearance: type || 'info',
      });

      dispatch(markNotificationSeen(id));
    }
  }, [notificationsEnabled, notifications, addToast, removeAllToasts, dispatch]);
};
