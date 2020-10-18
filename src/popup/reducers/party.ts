import { PartyActions } from '@root/lib/constants/party';

export interface PartyState {
  roomId: string | null;
  isHost: boolean;
}

type Action = { type: PartyActions } & Record<string, any>;

const initialState: PartyState = {
  roomId: null,
  isHost: false,
};

const party = (state: PartyState = initialState, action: Action) => {
  switch (action.type) {
    case PartyActions.JOIN_PARTY:
      return state;
    case PartyActions.CREATE_PARTY:
      return {
        ...state,
        roomId: action.roomId,
      };
    default:
      return state;
  }
};

export default party;
