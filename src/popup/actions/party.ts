import { PartyActions, ChromeRuntimeMessages, PopupViews } from '@root/lib/constants';
import http from '@root/lib/http';
import { debug } from '@root/lib/utils';
import { createAsyncAction } from '@root/lib/utils/redux';
import { setPopupView } from '@popup/actions/popup';
import { setUser } from '@popup/actions/user';
import { PartyState, PartyAsyncToggledState } from '@popup/reducers/party';
import { Dispatch } from 'redux';

export const updateUser = (user: any) => {
  return {
    type: PartyActions.UPDATE_USER,
    user,
  };
};

export const setParty = (details: PartyState) => {
  return {
    type: PartyActions.SET_PARTY,
    ...details,
  };
};

export const createParty = () =>
  createAsyncAction<PartyAsyncToggledState>({
    work: (dispatch: Dispatch) => {
      return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
          if (tabs[0]) {
            try {
              const { data } = await http.post('/party/create', {
                watchUrl: tabs[0].url,
              });

              chrome.tabs.sendMessage(
                tabs[0].id!,
                {
                  name: ChromeRuntimeMessages.JOIN_PARTY,
                  data: {
                    isHost: true,
                    hash: data.hash,
                  },
                },
                ({ data: { error, party, user } }) => {
                  if (error) {
                    chrome.tabs.sendMessage(tabs[0].id!, {
                      name: ChromeRuntimeMessages.ADD_NOTIFICATION,
                      data: {
                        notification: {
                          title: 'Error',
                          content: error,
                          type: 'error',
                        },
                      },
                    });
                    reject();
                    return;
                  }

                  dispatch(setParty(party));
                  dispatch(setUser(user));
                  dispatch(setPopupView(PopupViews.IN_PARTY));
                  resolve();
                }
              );
            } catch (error) {
              reject();
              debug(error.message);
            }
          }
        });
      });
    },
    key: 'isJoiningParty',
    reducer: 'party',
  });

export const joinParty = ({ hash }: any) =>
  createAsyncAction<PartyAsyncToggledState>({
    work: (dispatch: Dispatch) => {
      return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
          if (tabs[0]) {
            try {
              const { data } = await http.get(`/party?partyHash=${hash}`);

              chrome.tabs.sendMessage(
                tabs[0].id!,
                {
                  name: ChromeRuntimeMessages.JOIN_PARTY,
                  data: {
                    hash: data.hash,
                  },
                },
                ({ data: { error, party, user } }) => {
                  if (error) {
                    chrome.tabs.sendMessage(tabs[0].id!, {
                      name: ChromeRuntimeMessages.ADD_NOTIFICATION,
                      data: {
                        notification: {
                          title: 'Error',
                          content: error,
                          type: 'error',
                        },
                      },
                    });
                    reject();
                    return;
                  }

                  dispatch(setParty(party));
                  dispatch(setUser(user));
                  dispatch(setPopupView(PopupViews.IN_PARTY));
                  resolve();
                }
              );
            } catch (error) {
              reject();
              debug(error.message);
            }
          }
        });
      });
    },
    key: 'isJoiningParty',
    reducer: 'party',
  });
