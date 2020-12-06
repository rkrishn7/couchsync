import { ChatActions } from '@root/lib/constants/chat';
import { createAsyncReducer } from '@root/lib/utils/redux';

import { Reducer } from 'redux';

export type ChatAsyncToggledState = 'isSendingMessage';

export type ChatState = {
  messages: any[];
  enabled: boolean;
  notificationsEnabled: boolean;
} & Record<ChatAsyncToggledState, boolean>;

type Action = { type: ChatActions } & Record<string, any>;

const initialState: ChatState = {
  messages: [],
  enabled: false,
  notificationsEnabled: true,
  isSendingMessage: false,
};

const chat: Reducer<ChatState, Action> = (state = initialState, action) => {
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

export default createAsyncReducer(chat, 'chat');
