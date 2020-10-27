import { PartyActions, ChromeRuntimeMessages, PopupViews } from '@root/lib/constants';
import http from '@root/lib/http';
import { debug } from '@root/lib/utils';
import { setPopupView } from '@popup/actions/popup';
import { PartyState } from '@popup/reducers/party';
import { Dispatch } from 'redux';

export const setParty = (details: PartyState) => {
  return {
    type: PartyActions.SET_PARTY,
    ...details,
  };
};

export const createParty = () => {
  return (dispatch: Dispatch) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
      if (tabs[0]) {
        try {
          const { data } = await http.post('/party/create', {
            watchUrl: tabs[0].url,
          });

          const partyDetails = { isHost: true, ...data };

          dispatch(setParty({ isHost: true, ...partyDetails }));
          dispatch(setPopupView(PopupViews.IN_PARTY));

          // Send a runtime message to be picked up by content-script
          chrome.tabs.sendMessage(tabs[0].id!, {
            name: ChromeRuntimeMessages.SET_PARTY_DETAILS,
            data: partyDetails,
          });
        } catch (error) {
          debug(error.message);
        }
      }
    });
  };
};
