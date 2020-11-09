import { SocketEvents } from '@root/lib/constants';
import { setParty } from '@contentScript/actions/party';
import store from '@contentScript/store';
import socket from '@contentScript/socket';
/**
 * Handles any page transition on the hosts side and notifies the server with a URL_CHANGE event
 */
export function pageTransition(newUrl: string) {
  const state = store.getState();
  if (state.party.isHost && state.party.id != null) {
    const partyDetails = {
      ...state.party,
      joinUrl: `${newUrl}&couchSyncRoomId=${state.party.hash}`,
    };
    store.dispatch(setParty(partyDetails));
    // const newURL = `${document.location.href}&couchSyncRoomId=${state.party.id}`;
    socket.emit(SocketEvents.URL_CHANGE, {
      partyHash: state.party.hash,
      newUrl: `${newUrl}&couchSyncRoomId=${state.party.hash}`,
    });
  }
}

export function navigate(url: string) {
  const urlQuery = url.substring(23, 43);
  // nav.navigate(payload, false, undefined, {}, undefined);
  const injectedCode = `nav.navigate(
    {commandMetadata: {
      webCommandMetadata: { 
        url: '${urlQuery}',
        webPageType: 'WEB_PAGE_TYPE_WATCH',
        rootVe: 3832 
      },
    },
    watchEndpoint: {
       videoId: '${urlQuery.substring(9, urlQuery.length)}', nofollow: true 
      },
  }, false, undefined, {}, undefined)`;
  const script = document.createElement('script');
  script.appendChild(document.createTextNode(`(${injectedCode})();`));
  (document.body || document.head || document.documentElement).appendChild(script);
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
