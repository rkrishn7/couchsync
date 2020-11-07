import { UserActions, ChromeRuntimeMessages } from '@root/lib/constants';
import http from '@root/lib/http';
import { sendActiveTabMessage } from '@root/lib/utils/chrome';

import { UserState } from '@popup/reducers/user';
import { StoreState } from '@popup/store';

import { Dispatch } from 'redux';

interface UpdateProfileDetails {
  name: string;
  avatarUrl: string;
}

export const setUser = (details: UserState) => {
  return {
    type: UserActions.SET_USER,
    ...details,
  };
};

export const updateProfile = ({ name, avatarUrl }: UpdateProfileDetails) => {
  return async (dispatch: Dispatch, getState: () => StoreState) => {
    const { id: userId } = getState().user;

    try {
      const {
        data: { user },
      } = await http.put('/user/profile', {
        userId,
        name,
        avatarUrl,
      });

      console.log(user);

      /**
       * Relay to the content-script
       */
      sendActiveTabMessage({ name: ChromeRuntimeMessages.SET_USER_DETAILS, data: { user } });

      dispatch(setUser(user));
    } catch (error) {
      console.log(error);
    }
  };
};
