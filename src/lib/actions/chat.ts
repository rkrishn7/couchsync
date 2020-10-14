import * as Constants from '@root/lib/constants/chat';

export const sendMessage = (content: string) => {
  return {
    type: Constants.SEND_MESSAGE,
    message: {
      content,
      timestamp: Date.now(),
    },
  };
};
