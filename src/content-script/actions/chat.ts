import { ChatActions, SocketEvents } from '@root/lib/constants';

import socket from '@contentScript/socket';
import { StoreState } from '@contentScript/store';

import { Dispatch } from 'redux';

export const sendMessage = (content: string) => {
  return (dispatch: Dispatch, getState: () => StoreState) => {
    const state = getState();

    const messageData = {
      content,
      partyId: state.party.id,
      partyHash: state.party.hash,
      sentAt: new Date(),
    };

    socket.emit(SocketEvents.SEND_MESSAGE, messageData, ({ message }: any) => {
      dispatch({
        type: ChatActions.NEW_MESSAGE,
        message: { isOwnMessage: true, ...message },
      });
    });
  };
};

export const toggleChat = () => {
  return {
    type: ChatActions.TOGGLE_CHAT,
  };
};
