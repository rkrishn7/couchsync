import styled from '@root/style/styled';

interface AvatarProps {
  width?: number;
  height?: number;
}

export const Avatar = styled.img<AvatarProps>`
  width: ${p => p.width || 24}px;
  height: ${p => p.height || 24}px;
  margin-left: ${p => p.theme.space[1]}px;
  margin-right: ${p => p.theme.space[1]}px;
  border-radius: 9999px;
`;
