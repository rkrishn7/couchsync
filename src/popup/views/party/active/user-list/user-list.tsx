import React, { useEffect } from 'react';
import { Flex, Text } from 'rebass';
import { sortBy } from 'lodash';
import { connect, ConnectedProps } from 'react-redux';

import { Avatar } from '@root/components/avatar';
import styled from '@root/style/styled';
import { sendActiveTabMessage } from '@root/lib/utils/chrome';
import { ChromeRuntimeMessages } from '@root/lib/constants';

import { setParty } from '@popup/actions/party';
import { StoreState } from '@popup/store';

const UserCell = styled(Flex)`
  padding: ${p => p.theme.space[2]}px;
  justify-content: space-between;
  align-items: center;

  border-top: 1px solid ${p => p.theme.colors.greyLight};
  border-bottom: 1px solid ${p => p.theme.colors.greyLight};

  color: ${p => p.theme.colors.greyDarkest};
  font-weight: 700;
  transition: all 0.2s linear;

  :hover {
    color: ${p => p.theme.colors.secondary} !important;
    background-color: ${p => p.theme.colors.greyLighter};
  }
`;

const mapState = (state: StoreState) => {
  return {
    users: state.party.users,
    currentUser: state.user,
  };
};

const mapDispatch = {
  setParty,
};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

const UserList: React.FC<ReduxProps> = ({ users, currentUser, setParty }) => {
  useEffect(() => {
    /**
     * Set the party details
     */
    sendActiveTabMessage({ name: ChromeRuntimeMessages.GET_PARTY_DETAILS }, ({ data: party }) => {
      setParty(party);
    });
  }, [setParty]);

  return (
    <Flex flexDirection="column">
      <Text fontSize={1} color="greyDark" ml={1} mb={2} fontWeight={700}>
        party members
      </Text>
      {sortBy(users, u => currentUser.id !== u.id).map(user => (
        <UserCell>
          <Text fontSize={1} ml={1}>
            {user.name} {currentUser.id === user.id && ' (me)'}
          </Text>
          <Avatar src={user.avatarUrl} width={30} height={30} />
        </UserCell>
      ))}
    </Flex>
  );
};

export default connector(UserList);
