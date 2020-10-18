import {
  PartyActions,
  SocketEvents,
  CreatePartyResponse,
  ChromeRuntimeMessages,
  PopupViews,
} from '@root/lib/constants';
// import { StoreState } from '@popup/store';
import { setPopupView } from '@popup/actions/popup';
import socket from '@popup/socket';
import { Dispatch } from 'redux';

export const setJoinUrl = (joinUrl: string | null) => {
  return {
    type: PartyActions.SET_JOIN_URL,
    joinUrl,
  };
};

export const createParty = () => {
  return (dispatch: Dispatch) => {
    socket.emit(SocketEvents.CREATE_PARTY, ({ roomId }: CreatePartyResponse) => {
      dispatch({
        type: PartyActions.CREATE_PARTY,
        roomId,
      });
      dispatch(setPopupView(PopupViews.IN_PARTY));

      // Send message to content-script
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0]) {
          const joinUrl = `${tabs[0].url}&couchSyncRoomId=${roomId}`;
          dispatch(setJoinUrl(joinUrl));
          chrome.tabs.sendMessage(tabs[0].id!, {
            name: ChromeRuntimeMessages.SET_PARTY_DETAILS,
            data: { roomId, joinUrl },
          });
        }
      });
    });
  };
};
