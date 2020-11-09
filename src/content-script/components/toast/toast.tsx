import React from 'react';
import { Flex } from 'rebass';
import theme from '@root/style/theme';

type ToastAppearance = 'info' | 'error' | 'success' | 'warning';

interface ToastProps {
  appearance: ToastAppearance;
}

const ToastBackgroundColors: Record<ToastAppearance, string> = {
  info: theme.colors.info,
  error: theme.colors.error,
  success: theme.colors.success,
  warning: '',
};

export const Toast: React.FC<ToastProps> = ({ appearance, children }) => {
  return (
    <Flex
      flexDirection="column"
      width="200px"
      height="100px"
      padding={2}
      overflowY="scroll"
      backgroundColor={ToastBackgroundColors[appearance]}
      marginBottom={2}
      color="white">
      {children}
    </Flex>
  );
};
