import { Button as RButton } from 'rebass';
import styled from '@root/style/styled';

export const Button = styled(RButton)`
  height: 40px;
  margin-right: 5px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${p => p.theme.fonts.button};
  border-radius: ${p => p.theme.radii[2]}px;
  background-color: white;
  border: 1px solid ${p => p.theme.colors.primary};
  outline: none;
  color: ${p => p.theme.colors.primary};
  transition: all 0.2s ease-in-out;
  &:active {
    transform: scale(0.9);
  }
  &:hover {
    cursor: pointer;
    background-color: ${p => p.theme.colors.secondary};
    color: white;
  }
`;
