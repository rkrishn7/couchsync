import { PartyActions } from '@root/lib/constants/party';

export interface PartyState {
  id: string | null;
  isHost: boolean;
  joinUrl: string | null;
  hash: string | null;
  users: any[];
}

type Action = { type: PartyActions } & Record<string, any>;

const initialState: PartyState = {
  id: null,
  joinUrl: null,
  hash: null,
  isHost: false,
  users: [],
};

const party = (state: PartyState = initialState, action: Action): PartyState => {
  switch (action.type) {
    case PartyActions.SET_PARTY:
      return {
        ...state,
        isHost: action.isHost,
        hash: action.hash,
        joinUrl: action.joinUrl,
        id: action.id,
        users: action.users,
      };
    case PartyActions.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case PartyActions.REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.user.id),
      };
    case PartyActions.SET_IS_HOST:
      return {
        ...state,
        isHost: action.isHost,
      };
    default:
      return state;
  }
};

export default party;
