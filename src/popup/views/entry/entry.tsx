import React from 'react';
import { Flex, Heading } from 'rebass';

import styled from '@root/style/styled';
import theme from '@root/style/theme';
import { PopupViews } from '@root/lib/constants/popup';

import { connect, ConnectedProps } from 'react-redux';
import { StoreState } from '@popup/store';

import { CreateParty } from '@popup/views/party/create';
import { ActiveParty } from '@popup/views/party/active';
import { JoinParty } from '@popup/views/party/join';

import HashLoader from 'react-spinners/HashLoader';

const Container = styled(Flex)`
  flex-direction: column;
  min-width: 100%;
  min-height: 100%;
`;

const SpinnerContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-flex: 0;
  box-orient: vertical;
  box-direction: column;
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
            return <JoinParty />;
          case PopupViews.INVALID_URL:
            return (
              <SpinnerContainer>
                <Heading fontSize={3} marginBottom={3}>
                  please open a youtube video
                </Heading>
                <HashLoader loading size={50} color={theme.colors.secondary} />
              </SpinnerContainer>
            );
          case PopupViews.LOADING:
            return (
              <SpinnerContainer>
                <HashLoader loading size={50} color={theme.colors.secondary} />
              </SpinnerContainer>
            );
          default:
            return <Heading fontSize={2}>Unexpected Error</Heading>;
        }
      })()}
    </Container>
  );
};

export default connector(Entry);
