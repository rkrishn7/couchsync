import { PartyActions } from '@root/lib/constants/party';

export interface PartyState {
  roomId: string | null;
  isHost: boolean;
  joinUrl: string | null;
}

type Action = { type: PartyActions } & Record<string, any>;

const initialState: PartyState = {
  roomId: null,
  isHost: false,
  joinUrl: null,
};

const party = (state: PartyState = initialState, action: Action) => {
  switch (action.type) {
    case PartyActions.JOIN_PARTY:
      return state;
    case PartyActions.CREATE_PARTY:
      return {
        ...state,
        roomId: action.roomId,
        isHost: true,
      };
    case PartyActions.SET_JOIN_URL:
      return {
        ...state,
        joinUrl: action.joinUrl,
      };
    default:
      return state;
  }
};

export default party;
