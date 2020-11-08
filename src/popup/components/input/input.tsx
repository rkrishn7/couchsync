import { Input as RInput } from '@rebass/forms';
import styled from '@root/style/styled';

export const Input = styled(RInput)`
  flex: 1;
  border-radius: ${p => p.theme.radii[2]}px;
  font-size: 12px;
  font-family: ${p => p.theme.fonts.body};
  border-color: ${p => p.theme.colors.greyLight};
  color: ${p => p.theme.colors.primary};
  transition: all 0.2s linear;
  &:hover {
    border-color: ${p => p.theme.colors.greyDark};
  }
  &:focus {
    border-color: ${p => p.theme.colors.secondary};
  }
  outline: none;
`;
