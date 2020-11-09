import { ChatActions } from '@root/lib/constants/chat';

export interface ChatState {
  messages: any[];
  enabled: boolean;
  notificationsEnabled: boolean;
}

type Action = { type: ChatActions } & Record<string, any>;

const initialState: ChatState = {
  messages: [],
  enabled: false,
  notificationsEnabled: true,
};

const messages = (state: ChatState = initialState, action: Action): ChatState => {
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
    case ChatActions.TOGGLE_NOTIFICATIONS:
      return {
        ...state,
        notificationsEnabled: !state.notificationsEnabled,
      };
    case ChatActions.UPDATE_USER_MESSAGES:
      return {
        ...state,
        messages: state.messages.map(message => {
          return message.user.id === action.user.id
            ? {
                ...message,
                user: action.user,
              }
            : message;
        }),
      };
    default:
      return state;
  }
};

export default messages;
