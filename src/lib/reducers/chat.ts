import * as Actions from '@root/lib/constants/chat';

interface ChatState {
  messages: any[];
}

type Action = { type: keyof typeof Actions } & Record<string, any>;

const initialState: ChatState = {
  messages: [],
};

const messages = (state: ChatState = initialState, action: Action) => {
  switch (action.type) {
    case Actions.SEND_MESSAGE:
      return {
        messages: [...state.messages, action.message],
      };
    default:
      return state;
  }
};

export default messages;
