import { UserActions } from '@root/lib/constants';

import { UserState } from '@contentScript/reducers/user';

export const setUser = (details: UserState) => {
  return {
    type: UserActions.SET_USER,
    ...details,
  };
};
