import * as Constants from '@contentScript/constants/chat';

interface ChatState {
  messages: any[];
}

type Action = { type: keyof typeof Constants } & Record<string, any>;

const initialState: ChatState = {
  messages: [],
};

const messages = (state: ChatState = initialState, action: Action) => {
  switch (action.type) {
    case Constants.SEND_MESSAGE:
      return {
        messages: [...state.messages, action.message],
      };
    default:
      return state;
  }
};

export default messages;
