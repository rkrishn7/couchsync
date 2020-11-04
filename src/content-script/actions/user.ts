import { SocketEvents, UserActions } from '@root/lib/constants';
import { UserState } from '@contentScript/reducers/user';
import { StoreState } from '@contentScript/store';
import { Dispatch } from 'redux';
import socket from '@contentScript/socket';

export const setUser = (details: UserState) => {
  return {
    type: UserActions.SET_USER,
    ...details,
  };
};

export const updateName = (newName: string) => {
  // there should be a better way to do this, but I'm not sure how
  return (dispatch: Dispatch, getState: () => StoreState) => {
    console.log('updating name');
    console.log(socket.id);
    socket.emit(SocketEvents.CHANGE_NAME, { newName });
  };
};
