import React from 'react';
import { Flex, Heading } from 'rebass';

import styled from '@root/style/styled';
import { PopupViews } from '@root/lib/constants/popup';

import { connect, ConnectedProps } from 'react-redux';
import { StoreState } from '@popup/store';

import { CreateParty } from '@popup/views/party/create';
import { ActiveParty } from '@popup/views/party/active';

const Container = styled(Flex)`
  flex-direction: column;
  min-width: 100%;
`;

const mapState = (state: StoreState) => {
  return {
    popupView: state.popup.view,
  };
};

const connector = connect(mapState);

type ReduxProps = ConnectedProps<typeof connector>;

const Entry: React.FC<ReduxProps> = ({ popupView }) => {
  return (
    <Container>
      {(() => {
        switch (popupView) {
          case PopupViews.IN_PARTY:
            return <ActiveParty />;
          case PopupViews.CREATE_PARTY:
            return <CreateParty />;
          case PopupViews.JOIN_PARTY:
            return <Heading fontSize={2}>Join Party</Heading>;
          case PopupViews.INVALID_URL:
            return <Heading fontSize={2}>Please navigate to a youtube video</Heading>;
          case PopupViews.LOADING:
            return <Heading fontSize={2}>Loading...</Heading>;
          default:
            return <Heading fontSize={2}>Unexpected Error</Heading>;
        }
      })()}
    </Container>
  );
};

export default connector(Entry);
