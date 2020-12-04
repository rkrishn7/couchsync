import { UserActions, ChromeRuntimeMessages } from '@root/lib/constants';
import http from '@root/lib/http';
import { sendActiveTabMessage } from '@root/lib/utils/chrome';

import { UserState } from '@popup/reducers/user';
import { StoreState } from '@popup/store';
import { updateUser } from '@popup/actions/party';

import { Dispatch } from 'redux';

interface UpdateProfileDetails {
  name: string;
  avatarUrl: string;
}

export const setAutoJoin = (autoJoinSet: boolean) => {
  chrome.storage.sync.set(
    {
      autoJoin: autoJoinSet,
    },
    () => {
      console.log(`set value to: ${autoJoinSet}`);
    }
  );
};

export const getAutoJoin = () => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get('autoJoin', function (data) {
        resolve(data.autoJoin as boolean);
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

export const setUser = (user: UserState) => {
  return {
    type: UserActions.SET_USER,
    ...user,
  };
};

export const updateProfile = ({ name, avatarUrl }: UpdateProfileDetails) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    const {
      party: { hash: partyHash },
      user: { id: userId },
    } = getState();

    try {
      const {
        data: { user },
      } = await http.put('/user/profile', {
        userId,
        name,
        avatarUrl,
        partyHash,
      });

      /**
       * Relay to the content-script
       */
      sendActiveTabMessage({ name: ChromeRuntimeMessages.SET_USER_DETAILS, data: { user } });

      dispatch(setUser(user));
      dispatch(updateUser(user));
    } catch (error) {
      console.log(error);
    }
  };
};
