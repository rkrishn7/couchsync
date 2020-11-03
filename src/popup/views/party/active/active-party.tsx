import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Flex, Text } from 'rebass';
import { Input } from '@rebass/forms';

import { urlChange } from '@popup/actions/party';

import styled from '@root/style/styled';

import { StoreState } from '@popup/store';

const Container = styled(Flex)`
  flex-direction: column;
  min-width: 100%;
  padding: ${p => p.theme.space[2]}px;
`;

const RoomDisplay = styled(Input)`
  flex: 1;
  border-radius: ${p => p.theme.radii[2]}px;
  font-size: 14px;
  font-family: ${p => p.theme.fonts.body};
  border-color: ${p => p.theme.colors.greyLight};
  &:hover {
    border-color: ${p => p.theme.colors.greyDark};
  }
  &:focus {
    border-color: ${p => p.theme.colors.secondary};
  }
  outline: none;
`;

const mapState = (state: StoreState) => {
  return {
    joinUrl: state.party.joinUrl,
  };
};

const connector = connect(mapState, null);

type ReduxProps = ConnectedProps<typeof connector>;

const Party: React.FC<ReduxProps> = ({ joinUrl }) => {
  return (
    <Container>
      <Text fontSize={2}>Share the code with your friends:</Text>
      {joinUrl && <RoomDisplay value={joinUrl} readOnly onChange={urlChange(joinUrl)} />}
    </Container>
  );
};

export default connector(Party);
