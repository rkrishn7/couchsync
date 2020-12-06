import io from 'socket.io-client';

import settings from '@root/lib/settings';
import { ChatActions, SocketEvents, PartyActions } from '@root/lib/constants';
import { debug } from '@root/lib/utils/debug';

import { navigateToUrl } from '@contentScript/utils/transitions';
import store, { StoreState } from '@contentScript/store';
import { updateUser, createNotification, setJoinUrl } from '@contentScript/actions/party';
import { updateUserMessages } from '@contentScript/actions/chat';

import { Dispatch } from 'redux';

const socket = io(settings.baseUrl, {
  autoConnect: false,
  path: '/api/socket.io',
});

socket.on(SocketEvents.CONNECT, () => debug('socket connected'));

socket.on(SocketEvents.NEW_MESSAGE, ({ message }: any) => {
  store.dispatch({
    type: ChatActions.NEW_MESSAGE,
    message: { isOwnMessage: false, ...message },
  });
  store.dispatch(
    createNotification({
      content: message.content,
      title: message.user.name,
      avatar: message.user.avatarUrl,
    })
  );
});

socket.on(SocketEvents.USER_JOINED_PARTY, ({ user }: any) => {
  store.dispatch({
    type: PartyActions.ADD_USER,
    user,
  });
});

socket.on(SocketEvents.USER_LEFT_PARTY, ({ user }: any) => {
  store.dispatch({
    type: PartyActions.REMOVE_USER,
    user,
  });
});

socket.on(SocketEvents.PARTY_USER_UPDATED, ({ user }: any) => {
  store.dispatch(updateUser(user));
  store.dispatch(updateUserMessages(user));
});

socket.on(SocketEvents.NEW_HOST, ({ user }: any) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.dispatch((dispatch: Dispatch, getState: () => StoreState) => {
    const state = getState();
    dispatch({
      type: PartyActions.SET_IS_HOST,
      isHost: state.user.id === user.id,
    });
  });
});

socket.on(SocketEvents.URL_CHANGE, ({ data: { newUrl } }: any) => {
  store.dispatch(setJoinUrl(newUrl));
  navigateToUrl(newUrl);
});

socket.on(SocketEvents.ERROR, debug);

type EmitEventParams = {
  eventName: SocketEvents;
  data: any;
  timeout?: number;
};

/**
 * Emits an event and throws an error if a response wasn't received
 * before `timeout` ms. This is only to be used for emitting
 * events that require an acknowledgement.
 * @param EmitEventParams
 */
export const emitEvent = ({ eventName, data, timeout }: EmitEventParams): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (timeout) {
      setTimeout(() => {
        reject(new Error('Request timed out. Please try again.'));
      }, timeout);
    }

    socket.emit(eventName, data, (result: any) => {
      resolve(result);
    });
  });
};

export default socket;
