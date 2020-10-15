import { ChatActions } from '@root/lib/constants/chat';

export const sendMessage = (content: string) => {
  return {
    type: ChatActions.SEND_MESSAGE,
    message: {
      content,
      timestamp: Date.now(),
    },
  };
};

export const toggleChat = () => {
  return {
    type: ChatActions.TOGGLE_CHAT,
  };
};
