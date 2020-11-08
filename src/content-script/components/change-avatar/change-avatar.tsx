import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Flex } from 'rebass';
import { Input } from '@rebass/forms';
import styled from '@root/style/styled';

import { updateAvatar } from '@contentScript/actions/user';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { StoreState } from '@contentScript/store';

const Container = styled(Flex)`
  flex-direction: column;
  min-width: 100%;
  padding: ${p => p.theme.space[2]}px;
`;

// need to change this to be avatar generator
const NameInput = styled(Input)`
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

const ToolbarButton = styled.button`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  outline: none;
  color: #909090;
  transition: all 0.2s ease-in-out;
  &:active {
    transform: scale(0.9);
  }
  &:hover {
    cursor: pointer;
    color: ${p => p.theme.colors.secondary};
  }
`;

const mapState = (state: StoreState) => {
  console.log(state.user.avatarUrl);
  return {
    avatarUrl: state.user.avatarUrl,
    user: state.user,
  };
};

const mapDispatch = {
  updateAvatar: (newAvatarUrl: string) => updateAvatar(),
};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

const ChangeAvatar: React.FC<ReduxProps> = ({ updateAvatar, avatarUrl, user }) => {
  const [userAvatar, setNewAvatar] = useState(avatarUrl);
  const handleSubmitAvatarUrl = () => {
    const mapStateSmall = (state: StoreState) => {
      return {
        avatarUrl: state.user.avatarUrl,
      };
    };
    connect(mapStateSmall);
    updateAvatar(userAvatar);
    setNewAvatar(userAvatar);
    console.log('changed avatar');
  };

  return (
    <Container>
      <Flex flexDirection="row">
        <img height="50px" width="50px" src={avatarUrl} alt="avatar" />
        <ToolbarButton>
          <FontAwesomeIcon icon={faSync} size="lg" onClick={handleSubmitAvatarUrl} />
        </ToolbarButton>
      </Flex>
    </Container>
  );
};

export default connector(ChangeAvatar);
