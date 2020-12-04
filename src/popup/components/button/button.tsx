import React from 'react';
import { Button as RButton, ButtonProps as RButtonProps } from 'rebass';

import styled from '@root/style/styled';
import theme from '@root/style/theme';

import Loader from 'react-spinners/ClipLoader';

interface ButtonProps extends RButtonProps {
  height?: number;
  mr?: number;
  ml?: number;
  loaderSize?: number;
  loaderColor?: string;
  loaderHoverColor?: string;
  loading?: boolean;
}

export const ButtonContainer = styled(RButton)<ButtonProps>`
  height: ${p => p.height || 40}px;
  margin-right: ${p => (p.mr as number) || 5}px;
  margin-left: ${p => (p.ml as number) || 5}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${p => p.theme.fonts.button};
  border-radius: ${p => p.theme.radii[2]}px;
  background-color: white;
  border: 1px solid ${p => (p.disabled ? p.theme.colors.greyDark : p.theme.colors.primary)};
  outline: none;
  color: ${p => (p.disabled ? p.theme.colors.greyDark : p.theme.colors.primary)};
  transition: all 0.2s ease-in-out;
  &:active {
    ${p => !p.disabled && 'transform: scale(0.9)'};
  }
  &:hover {
    cursor: pointer;
    background-color: ${p => !p.disabled && p.theme.colors.primary};
    color: ${p => !p.disabled && 'white'};
  }
`;

export const Button: React.FC<ButtonProps> = ({ loading, children, loaderSize, loaderColor, ...props }) => {
  return (
    <ButtonContainer {...props}>
      {!loading ? children : <Loader size={loaderSize || props.height || 20} color={theme.colors.greyDarker} />}
    </ButtonContainer>
  );
};
