import { PartyActions } from '@root/lib/constants/party';

export interface PartyState {
  id: string | null;
  isHost: boolean;
  hash: string | null;
  joinUrl: string | null;
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
    default:
      return state;
  }
};

export default party;
