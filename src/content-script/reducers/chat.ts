import { ChatActions } from '@root/lib/constants/chat';

export interface ChatState {
  messages: any[];
  enabled: boolean;
}

type Action = { type: ChatActions } & Record<string, any>;

const initialState: ChatState = {
  messages: [],
  enabled: false,
};

const messages = (state: ChatState = initialState, action: Action) => {
  switch (action.type) {
    case ChatActions.NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case ChatActions.TOGGLE_CHAT:
      return {
        ...state,
        enabled: !state.enabled,
      };
    default:
      return state;
  }
};

export default messages;
