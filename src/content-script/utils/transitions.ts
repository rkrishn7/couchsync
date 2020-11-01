import { PartyActions } from '@root/lib/constants/party';
import { SocketEvents } from '@root/lib/constants';
import { setParty } from '@contentScript/actions/party';
import store from '@contentScript/store';
import socket from '@contentScript/socket';
/**
 * Handles any page transition on the hosts side and notifies the server with a URL_CHANGE event
 */
export function pageTransition(newUrl: string) {
  console.log('in pageTransition');
  const state = store.getState();
  if (state.party.isHost && state.party.id != null) {
    const partyDetails = {
      ...state.party,
      joinUrl: `${newUrl}&couchSyncRoomId=${state.party.hash}`,
    };
    console.log(`URL Changed in room ${state.party.hash}`);
    store.dispatch(setParty(partyDetails));
    // const newURL = `${document.location.href}&couchSyncRoomId=${state.party.id}`;
    socket.emit(SocketEvents.URL_CHANGE, {
      partyHash: state.party.hash,
      newUrl: `${newUrl}&couchSyncRoomId=${state.party.hash}`,
    });
  }
}

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
