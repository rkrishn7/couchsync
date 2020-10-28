import io from 'socket.io-client';
import camelCase from 'camelcase-keys';

import settings from '@root/lib/settings';
import { ChatActions, SocketEvents } from '@root/lib/constants';

import store from '@contentScript/store';

const socket = io(settings.apiUrl);

socket.on(SocketEvents.CONNECT, () => console.log('connected'));

socket.on(SocketEvents.NEW_MESSAGE, ({ message }: any) => {
  store.dispatch({
    type: ChatActions.NEW_MESSAGE,
    message: { isOwnMessage: false, ...camelCase(message) },
  });
});

export default socket;
