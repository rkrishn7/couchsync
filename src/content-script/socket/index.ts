import io from 'socket.io-client';

import settings from '@root/lib/settings';
import { ChatActions, SocketEvents } from '@root/lib/constants';

import store from '@contentScript/store';
import { setParty } from '@contentScript/actions/party';

const socket = io(settings.apiUrl);

socket.on(SocketEvents.CONNECT, () => console.log('connected'));

socket.on(SocketEvents.NEW_MESSAGE, ({ message }: any) => {
  store.dispatch({
    type: ChatActions.NEW_MESSAGE,
    message: { isOwnMessage: false, ...message },
  });
});

socket.on(SocketEvents.URL_CHANGE, ({ data }: any) => {
  store.dispatch(setParty({ ...store.getState().party, joinUrl: data.newUrl }));
  const nav = document.querySelector('yt-navigation-manager');
  const urlQuery = data.newUrl.substring(23, 43); // find better option than regex
  console.log(urlQuery);
  const payload = {
    commandMetadata: {
      webCommandMetadata: { url: urlQuery, webPageType: 'WEB_PAGE_TYPE_WATCH', rootVe: 3832 },
    },
    watchEndpoint: { videoId: urlQuery.substring(9, urlQuery.length), nofollow: true },
  };
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

  // Dispatch new URL to store
  // Update chrome's current tabs
});

export default socket;
