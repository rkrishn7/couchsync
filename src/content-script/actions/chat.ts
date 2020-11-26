import { ChatActions, SocketEvents } from '@root/lib/constants';

import socket from '@contentScript/socket';
import { StoreState } from '@contentScript/store';

import { Dispatch } from 'redux';
import moment from 'moment';

export const sendMessage = (content: string) => {
  return (dispatch: Dispatch, getState: () => StoreState) => {
    const state = getState();

    const messageData = {
      content,
      partyId: state.party.id,
      partyHash: state.party.hash,
      sentAt: moment(),
    };

    socket.emit(SocketEvents.SEND_MESSAGE, messageData, ({ message }: any) => {
      dispatch({
        type: ChatActions.NEW_MESSAGE,
        message: { isOwnMessage: true, ...message },
      });
    });
  };
};

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
