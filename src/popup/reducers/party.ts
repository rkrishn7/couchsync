import { PartyActions } from '@root/lib/constants/party';
import { createAsyncReducer } from '@root/lib/utils/redux';

export type PartyAsyncToggledState = 'isJoiningParty';

export type PartyState = {
  id: string | null;
  isHost: boolean;
  hash: string | null;
  joinUrl: string | null;
  users: any[];
} & Record<PartyAsyncToggledState, boolean>;

type Action = { type: PartyActions } & Record<string, any>;

const initialState: PartyState = {
  id: null,
  joinUrl: null,
  hash: null,
  isHost: false,
  users: [],
  isJoiningParty: false,
};

const party = (state: PartyState = initialState, action: Action) => {
  switch (action.type) {
    case PartyActions.SET_PARTY:
      return {
        ...state,
        id: action.id,
        joinUrl: action.joinUrl,
        hash: action.hash,
        isHost: true,
        users: action.users || [],
      };
    case PartyActions.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => (user.id === action.user.id ? action.user : user)),
      };
    default:
      return state;
  }
};

export default createAsyncReducer(party, 'party');
