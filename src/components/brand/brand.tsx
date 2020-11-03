import React from 'react';
import { Box, BoxProps, Heading, HeadingProps } from 'rebass';
import settings from '@root/lib/settings';
import styled from '@root/style/styled';

interface BrandProps extends BoxProps {
  children?: never;
  color?: string;
  headingProps?: HeadingProps;
}

const FlashHeading = styled(Heading)`
  transition: all 200ms linear;

  :hover {
    color: ${p => p.theme.colors.secondary};
    cursor: pointer;
  }
`;

export const Brand: React.FC<BrandProps> = ({ color = 'primary', headingProps, ...props }) => {
  return (
    <Box {...props}>
      <FlashHeading color={color} {...headingProps}>
        {settings.brandName}
      </FlashHeading>
    </Box>
  );
};
