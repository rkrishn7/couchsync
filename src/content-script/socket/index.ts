import io from 'socket.io-client';

import settings from '@root/lib/settings';
import { ChatActions, SocketEvents, PartyActions } from '@root/lib/constants';
import { debug } from '@root/lib/utils/debug';

import { navigate } from '@contentScript/utils/transitions';
import store, { StoreState } from '@contentScript/store';
import { updateUser, createNotification } from '@contentScript/actions/party';
import { updateUserMessages } from '@contentScript/actions/chat';

import { Dispatch } from 'redux';


const socket = io(settings.apiUrl);

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

socket.on(SocketEvents.URL_CHANGE, ({ data }: any) => {
  store.dispatch(setParty({ ...store.getState().party, joinUrl: data.newUrl }));
  navigate(data.newUrl);
  // Dispatch new URL to store
  // Update chrome's current tabs
});

export default socket;
