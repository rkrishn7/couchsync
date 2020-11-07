import { PartyActions, SocketEvents } from '@root/lib/constants';
import { debug } from '@root/lib/utils/debug';

import { PartyState } from '@contentScript/reducers/party';
import socket from '@contentScript/socket';

import { Dispatch } from 'redux';

import { setUser } from './user';

export const setParty = (details: PartyState) => {
  return {
    type: PartyActions.SET_PARTY,
    ...details,
  };
};

export const updateUser = (user: any) => {
  return {
    type: PartyActions.UPDATE_USER,
    user,
  };
};

export const joinParty = ({ hash, isHost }: any) => {
  return (dispatch: Dispatch) => {
    try {
      socket.emit(SocketEvents.JOIN_PARTY, { partyHash: hash }, ({ party, user }: any) => {
        dispatch(setParty({ isHost, ...party }));
        dispatch(setUser({ ...user }));
      });
    } catch (error) {
      debug(error.message);
    }
  };
};
