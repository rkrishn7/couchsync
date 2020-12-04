import React from 'react';
import { Flex, Text } from 'rebass';
import { Button } from '@popup/components/button';
import styled from '@root/style/styled';

import { connect, ConnectedProps } from 'react-redux';
import { createParty } from '@popup/actions/party';
import { StoreState } from '@popup/store';

const Container = styled(Flex)`
  flex-direction: column;
  padding: ${p => p.theme.space[2]}px;
  justify-content: flex-end;
  height: 70px;
`;

const mapState = (state: StoreState) => {
  return {
    joiningParty: state.party.isJoiningParty,
  };
};

const mapDispatch = {
  createParty,
};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

const Party: React.FC<ReduxProps> = ({ createParty, joiningParty }) => {
  return (
    <Container>
      <Button onClick={createParty} loading={joiningParty} disabled={joiningParty}>
        <Text fontSize={2} fontWeight={400}>
          create a party
        </Text>
      </Button>
    </Container>
  );
};

export default connector(Party);
