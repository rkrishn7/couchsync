import React from 'react';
import { Flex, Text } from 'rebass';

import { Avatar } from '@root/components/avatar';
import styled from '@root/style/styled';

interface UserListProps {
  users: any[];
  currentUser: any;
}

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

export const UserList: React.FC<UserListProps> = ({ users, currentUser }) => {
  return (
    <Flex flexDirection="column">
      <Text fontSize={1} color="greyDark" ml={1} mb={2} fontWeight={700}>
        party members
      </Text>
      {users.map(user => (
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
