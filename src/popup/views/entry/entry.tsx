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

import Loader from 'react-spinners/ScaleLoader';

const Container = styled(Flex)`
  flex-direction: column;
  background-color: white;
  min-width: 100%;
  min-height: 100%;
`;

const SpinnerContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
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
                <Loader loading height={30} width={4} radius={30} margin={5} color={theme.colors.primary} />
                <Heading fontSize={2} marginTop={3} color="greyDark">
                  please open a youtube video
                </Heading>
              </SpinnerContainer>
            );
          case PopupViews.LOADING:
            return (
              <SpinnerContainer>
                <Loader loading height={30} width={4} radius={30} margin={5} color={theme.colors.primary} />
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
