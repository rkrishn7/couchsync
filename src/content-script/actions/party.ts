import { PartyActions, SocketEvents } from '@root/lib/constants';
import { debug } from '@root/lib/utils/debug';

import { PartyState } from '@contentScript/reducers/party';
import socket from '@contentScript/socket';

import { disableAutoplay } from '@root/lib/utils';

import { Dispatch } from 'redux';

import { setUser } from './user';

export const setParty = (details: PartyState) => {
  return {
    type: PartyActions.SET_PARTY,
    ...details,
  };
};

export const joinParty = ({ hash, isHost }: any) => {
  return (dispatch: Dispatch) => {
    try {
      socket.emit(SocketEvents.JOIN_PARTY, { partyHash: hash }, ({ party, user }: any) => {
        dispatch(setParty({ isHost, ...party }));
        dispatch(setUser({ ...user }));
      });
      disableAutoplay();
    } catch (error) {
      debug(error.message);
    }
  };
};
