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
    case PartyActions.SET_ROOM_ID:
      return {
        ...state,
        roomId: action.roomId,
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
