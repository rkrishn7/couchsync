import { PartyActions } from '@root/lib/constants/party';

export interface PartyState {
  id: string | null;
  isHost: boolean;
  joinUrl: string | null;
}

type Action = { type: PartyActions } & Record<string, any>;

const initialState: PartyState = {
  id: null,
  joinUrl: null,
  isHost: false,
};

const party = (state: PartyState = initialState, action: Action) => {
  switch (action.type) {
    case PartyActions.JOIN_PARTY:
      return state;
    case PartyActions.CREATE_PARTY:
      return {
        ...state,
        id: action.roomId,
        joinUrl: action.joinUrl,
        isHost: true,
      };
    case PartyActions.SET_JOIN_URL:
      return {
        ...state,
        joinUrl: action.joinUrl,
      };
    case PartyActions.SET_PARTY_ID:
      return {
        ...state,
        id: action.partyId,
      };
    case PartyActions.SET_HOST:
      return {
        ...state,
        isHost: true,
      };
    default:
      return state;
  }
};

export default party;
