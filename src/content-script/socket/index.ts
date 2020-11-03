import io from 'socket.io-client';

import settings from '@root/lib/settings';
import { ChatActions, SocketEvents } from '@root/lib/constants';

import store from '@contentScript/store';
import { setParty } from '@contentScript/actions/party';

const socket = io(settings.apiUrl);

socket.on(SocketEvents.CONNECT, () => console.log('connected'));

socket.on(SocketEvents.NEW_MESSAGE, ({ message }: any) => {
  store.dispatch({
    type: ChatActions.NEW_MESSAGE,
    message: { isOwnMessage: false, ...message },
  });
});

socket.on(SocketEvents.URL_CHANGE, ({ data }: any) => {
  store.dispatch(setParty({ ...store.getState().party, joinUrl: data.newUrl }));
  // Dispatch new URL to store
  // Update chrome's current tabs
});

export default socket;
