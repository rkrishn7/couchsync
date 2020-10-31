import { PartyActions } from '@root/lib/constants/party';
import { SocketEvents } from '@root/lib/constants';
import { setParty } from '@contentScript/actions/party';
import { StoreState } from '@contentScript/store';
import { Dispatch } from 'redux';
import socket from '@contentScript/socket';
/**
 * Handles any page transition on the hosts side and notifies the server with a URL_CHANGE event
 */
export const pageTransition = (newUrl: string) => {
  return (dispatch: Dispatch, getState: () => StoreState) => {
    const state = getState();
    if (state.party.isHost && state.party.id != null) {
      const partyDetails = {
        ...state.party,
        joinUrl: newUrl,
      };
      dispatch(setParty(partyDetails));
      // const newURL = `${document.location.href}&couchSyncRoomId=${state.party.id}`;
      socket.emit(SocketEvents.URL_CHANGE, `URL Changed in room ${state.party.id}`);
    }
  };
};

/**
 * Handles teardown of content script.
 * Clean up any listeners, sockets, visual components here.
 */
export function teardown() {
  const extensionRoot = document.getElementById('extension-panel-root');
  if (extensionRoot) {
    extensionRoot.style.display = 'none';
  }
}
