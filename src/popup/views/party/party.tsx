import React from 'react';
import { Flex, Button, Text } from 'rebass';
import styled from '@root/style/styled';

import { connect, ConnectedProps } from 'react-redux';
import { createParty } from '@popup/actions/party';
import { StoreState } from '@popup/store';

const Container = styled(Flex)`
  flex-direction: column;
  min-width: 100%;
  padding: ${p => p.theme.space[2]}px;
`;

const CreatePartyButton = styled(Button)`
  height: 40px;
  margin-right: 5px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.theme.colors.secondary};
  border-radius: ${p => p.theme.radii[2]}px;
  border: none;
  outline: none;
  color: white;
  transition: all 0.2s ease-in-out;
  &:active {
    transform: scale(0.9);
  }
  &:hover {
    cursor: pointer;
    border-color: ${p => p.theme.colors.primary};
  }
`;

const mapState = (state: StoreState) => {
  return {
    roomId: state.party.roomId,
  };
};

const mapDispatch = {
  createParty,
};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

const Party: React.FC<ReduxProps> = ({ createParty, roomId }) => {
  return (
    <Container>
      <CreatePartyButton onClick={createParty}>
        <Text fontSize={2}>Create a Party</Text>
      </CreatePartyButton>
      {roomId && <Text fontSize={2}>Room id: {roomId}</Text>}
    </Container>
  );
};

export default connector(Party);
