import { PartyActions } from '@root/lib/constants/party';

export interface PartyState {
  id: string | null;
  isHost: boolean;
  joinUrl: string | null;
  hash: string | null;
}

type Action = { type: PartyActions } & Record<string, any>;

const initialState: PartyState = {
  id: null,
  joinUrl: null,
  hash: null,
  isHost: false,
};

const party = (state: PartyState = initialState, action: Action) => {
  switch (action.type) {
    case PartyActions.SET_PARTY:
      return {
        ...state,
        isHost: action.isHost,
        hash: action.hash,
        joinUrl: action.joinUrl,
        id: action.id,
      };
    default:
      return state;
  }
};

export default party;
