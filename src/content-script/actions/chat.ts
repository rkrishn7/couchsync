import { ChatActions, SocketEvents } from '@root/lib/constants';
import { createAsyncAction } from '@root/lib/utils/redux';

import socket from '@contentScript/socket';
import { StoreState } from '@contentScript/store';
import { ChatAsyncToggledState } from '@contentScript/reducers/chat';

import { Dispatch } from 'redux';
import moment from 'moment';

export const sendMessage = (content: string) =>
  createAsyncAction<ChatAsyncToggledState>({
    work: (dispatch: Dispatch, getState: () => StoreState) => {
      const state = getState();

      const messageData = {
        content,
        partyId: state.party.id,
        partyHash: state.party.hash,
        sentAt: moment(),
      };

      return new Promise(resolve => {
        socket.emit(SocketEvents.SEND_MESSAGE, messageData, ({ message }: any) => {
          dispatch({
            type: ChatActions.NEW_MESSAGE,
            message: { isOwnMessage: true, ...message },
          });

          resolve();
        });
      });
    },
    key: 'isSendingMessage',
    reducer: 'chat',
  });

export const updateUserMessages = (user: any) => {
  return {
    type: ChatActions.UPDATE_USER_MESSAGES,
    user,
  };
};

export const toggleChat = () => {
  return {
    type: ChatActions.TOGGLE_CHAT,
  };
};

export const toggleNotifications = () => {
  return {
    type: ChatActions.TOGGLE_NOTIFICATIONS,
  };
};
