import { PartyActions, SocketEvents } from '@root/lib/constants';
import { debug } from '@root/lib/utils/debug';

import { PartyState } from '@contentScript/reducers/party';
import socket from '@contentScript/socket';

import { Dispatch } from 'redux';

import camelCase from 'camelcase-keys';

export const setParty = (details: PartyState) => {
  return {
    type: PartyActions.SET_PARTY,
    ...details,
  };
};

export const joinParty = ({ hash, isHost }: any) => {
  return (dispatch: Dispatch) => {
    try {
      socket.emit(SocketEvents.JOIN_PARTY, { partyHash: hash }, ({ party }: any) => {
        // TODO: client middleware to camelCase responses?
        dispatch(setParty({ isHost, ...camelCase(party) }));
      });
    } catch (error) {
      debug(error.message);
    }
  };
};
