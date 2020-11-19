import React from 'react';
import { Flex, Text } from 'rebass';
import { Button } from '@popup/components/button';
import styled from '@root/style/styled';

import { connect, ConnectedProps } from 'react-redux';
import { createParty } from '@popup/actions/party';

const Container = styled(Flex)`
  flex-direction: column;
  padding: ${p => p.theme.space[2]}px;
  justify-content: flex-end;
  height: 70px;
`;

const mapDispatch = {
  createParty,
};

const connector = connect(null, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

const Party: React.FC<ReduxProps> = ({ createParty }) => {
  return (
    <Container>
      <Button onClick={createParty}>
        <Text fontSize={2} fontWeight={400}>
          create a party
        </Text>
      </Button>
    </Container>
  );
};

export default connector(Party);
