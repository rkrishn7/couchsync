import React from 'react';
import { Flex, Text } from 'rebass';
import styled from '@root/style/styled';
import { Button } from '@popup/components/button';

import { connect, ConnectedProps } from 'react-redux';
import { joinParty } from '@popup/actions/party';

import { parseUrl } from 'query-string';

const Container = styled(Flex)`
  flex-direction: column;
  min-width: 100%;
  height: 70px;
  justify-content: flex-end;
  padding: ${p => p.theme.space[2]}px;
`;

const mapDispatch = {
  joinParty,
};

const connector = connect(null, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

const JoinParty: React.FC<ReduxProps> = ({ joinParty }) => {
  const handleJoinParty = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0]) {
        const {
          query: { couchSyncRoomId },
        } = parseUrl(tabs[0].url!);
        joinParty({ hash: couchSyncRoomId });
      }
    });
  };

  return (
    <Container>
      <Button onClick={handleJoinParty}>
        <Text fontSize={2} fontWeight={400}>
          join party
        </Text>
      </Button>
    </Container>
  );
};

export default connector(JoinParty);
