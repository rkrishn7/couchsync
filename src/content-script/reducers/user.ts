import { UserActions } from '@root/lib/constants';

export type UserState = Partial<{
  id: number;
  name: string;
  avatarUrl: string;
}>;

type Action = { type: UserActions } & Record<string, any>;

const initialState: UserState = {};

const user = (state: UserState = initialState, action: Action) => {
  switch (action.type) {
    case UserActions.SET_USER:
      return {
        ...state,
        id: action.id,
        name: action.name,
        avatarUrl: action.avatarUrl,
      };
    default:
      return state;
  }
};

export default user;
