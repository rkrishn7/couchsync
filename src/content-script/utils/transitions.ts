import { SocketEvents, ContentScriptActions } from '@root/lib/constants';
import { inject } from '@root/lib/utils';

import { setJoinUrl } from '@contentScript/actions/party';
import store from '@contentScript/store';
import socket from '@contentScript/socket';

import { stringifyUrl, parseUrl } from 'query-string';

export function navigateToUrl(url: string) {
  const { query } = parseUrl(url);
  const navigationInjection = `function(){
    nav.navigate({
      commandMetadata: {
        webCommandMetadata: {
          url: '/watch?v=${query.v}&couchSyncRoomId=${query.couchSyncRoomId}',
        },
      },
    }, false, undefined, {}, undefined);
  }`;

  inject(navigationInjection);
}

/**
 * Handles page transitions
 */
export function onPageNavigate() {
  const {
    party: { isHost, id: partyId, hash: partyHash, joinUrl },
  } = store.getState();

  if (!partyId) return;

  const {
    query: { v: newVidId },
  } = parseUrl(document.location.href);

  const {
    query: { v: storedVidId },
  } = parseUrl(joinUrl!);

  // The host is navigating to another video: notify party members
  if (!!newVidId && isHost) {
    const newJoinUrl = stringifyUrl({
      url: document.location.href,
      query: {
        couchSyncRoomId: partyHash,
      },
    });

    store.dispatch(setJoinUrl(newJoinUrl));
    socket.emit(SocketEvents.URL_CHANGE, {
      partyHash,
      newUrl: newJoinUrl,
    });
    // A user is manually navigating or host is navigating but not to another video: teardown
  } else if (newVidId !== storedVidId) {
    socket.disconnect();
    store.dispatch({
      type: ContentScriptActions.TEARDOWN_STATE,
    });
  }
}

export function syncVideoWithParty() {
  const {
    party: { joinUrl },
  } = store.getState();

  if (!joinUrl) return;

  const {
    query: { v: currentVidId },
  } = parseUrl(document.location.href);

  const {
    query: { v: storedVidId },
  } = parseUrl(joinUrl);

  if (currentVidId !== storedVidId) {
    navigateToUrl(joinUrl);
  }
}
