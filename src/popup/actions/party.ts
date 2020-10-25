import { PartyActions, ChromeRuntimeMessages, PopupViews } from '@root/lib/constants';
import http from '@root/lib/http';
import { debug } from '@root/lib/utils';
import { setPopupView } from '@popup/actions/popup';
import { Dispatch } from 'redux';

export const setJoinUrl = (joinUrl: string | null) => {
  return {
    type: PartyActions.SET_JOIN_URL,
    joinUrl,
  };
};

export const setPartyId = (partyId: string | null) => {
  return {
    type: PartyActions.SET_PARTY_ID,
    partyId,
  };
};

export const setPartyHost = () => {
  return {
    type: PartyActions.SET_HOST,
  };
};

export const createParty = () => {
  return (dispatch: Dispatch) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
      if (tabs[0]) {
        try {
          const {
            data: { partyHash, joinUrl },
          } = await http.post('/party/create', {
            watchUrl: tabs[0].url,
          });

          dispatch({
            type: PartyActions.CREATE_PARTY,
            id: partyHash,
            joinUrl,
          });
          dispatch(setPopupView(PopupViews.IN_PARTY));

          // Send a runtime message. Will be picked up by content-script
          chrome.tabs.sendMessage(tabs[0].id!, {
            name: ChromeRuntimeMessages.SET_PARTY_DETAILS,
            data: {
              partyId: partyHash,
              joinUrl,
              isHost: true,
            },
          });
        } catch (error) {
          debug(error.message);
        }
      }
    });
  };
};
