import React from 'react';
import { Flex, FlexProps, Heading, HeadingProps } from 'rebass';
import styled from '@root/style/styled';
import settings from '@root/lib/settings';

const BrandContainer = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

interface BrandProps extends FlexProps {
  children?: never;
  color?: string;
  headingProps?: HeadingProps;
}

export const Brand: React.FC<BrandProps> = ({ color = 'primary', headingProps, ...props }) => {
  return (
    <BrandContainer {...props}>
      <Heading color={color} {...headingProps}>
        {settings.brandName}
      </Heading>
    </BrandContainer>
  );
};
