import React from 'react';
import { Flex, Heading } from 'rebass';
import styled from '@root/style/styled';

import { connect, ConnectedProps } from 'react-redux';
import { StoreState } from '@popup/store';

import { Party } from '@popup/views/party';

const Container = styled(Flex)`
  flex-direction: column;
  min-width: 100%;
`;

const mapState = (state: StoreState) => {
  return {
    enabled: state.popup.enabled,
  };
};

const connector = connect(mapState);

type ReduxProps = ConnectedProps<typeof connector>;

const Entry: React.FC<ReduxProps> = ({ enabled }) => {
  return (
    <Container>{enabled ? <Party /> : <Heading fontSize={2}>Please navigate to a youtube video</Heading>}</Container>
  );
};

export default connector(Entry);
