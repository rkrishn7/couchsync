import { PartyActions, SocketEvents, CreatePartyResponse } from '@root/lib/constants';
// import { StoreState } from '@popup/store';
import socket from '@popup/socket';
import { Dispatch } from 'redux';

export const createParty = () => {
  return (dispatch: Dispatch) => {
    console.log('hello');
    socket.emit(SocketEvents.CREATE_PARTY, ({ roomId }: CreatePartyResponse) => {
      dispatch({
        type: PartyActions.CREATE_PARTY,
        roomId,
      });
    });
  };
};
