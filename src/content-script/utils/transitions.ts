import { SocketEvents } from '@root/lib/constants';
import { setParty } from '@contentScript/actions/party';
import http from '@root/lib/http';
import store from '@contentScript/store';
import socket from '@contentScript/socket';
import { stringifyUrl } from 'query-string';
/**
 * Handles any page transition on the hosts side and notifies the server with a URL_CHANGE event
 */
export function pageTransition(newUrl: string) {
  const state = store.getState();
  if (state.party.isHost && state.party.id != null) {
    const newJoinUrl = stringifyUrl({
      url: newUrl,
      query: {
        couchSyncRoomId: state.party.hash,
      },
    });
    console.log(newJoinUrl);
    const partyDetails = {
      ...state.party,
      joinUrl: newJoinUrl,
    };
    store.dispatch(setParty(partyDetails));
    socket.emit(SocketEvents.URL_CHANGE, {
      partyHash: state.party.hash,
      newUrl: newJoinUrl,
    });
  } else if (!state.party.isHost) {
    console.log('NON-HOST NAV');
    console.log(newUrl);
    // call leaveParty();
    // socket.disconnect();
  }
}

export function navigate(url: string) {
  const urlQueryArr = url.match(/v=(.*)/);
  if (urlQueryArr == null) {
    throw new Error(`New URL not found`);
  }
  const urlQuery = urlQueryArr[0];
  const injectedCode = `nav.navigate(
    {commandMetadata: {
      webCommandMetadata: { 
        url: '/watch?${urlQuery}', 
        webPageType: 'WEB_PAGE_TYPE_WATCH',
        rootVe: 3832 
      },
    },
    watchEndpoint: {
       videoId: '${urlQuery.substring(2, urlQuery.length)}', nofollow: true 
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
