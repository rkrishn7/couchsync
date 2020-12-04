import React, { useEffect, useState } from 'react';
import { Flex, Text } from 'rebass';
import { connect, ConnectedProps } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

import { Label } from '@rebass/forms';
import { Button } from '@popup/components/button';
import { Input } from '@popup/components/input';
import { Checkbox } from '@popup/components/checkbox';
import { IconButton } from '@popup/components/icon-button';
import { setAutoJoin, getAutoJoin, setUser, updateProfile } from '@popup/actions/user';
import { StoreState } from '@popup/store';

import { Avatar } from '@root/components/avatar';
import theme from '@root/style/theme';
import { sendActiveTabMessage } from '@root/lib/utils/chrome';
import { ChromeRuntimeMessages } from '@root/lib/constants';

const mapState = (state: StoreState) => {
  return {
    userName: state.user.name,
    avatarUrl: state.user.avatarUrl,
  };
};

const mapDispatch = {
  setAutoJoin,
  setUser,
  updateProfile,
};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

const Profile: React.FC<ReduxProps> = ({ userName, avatarUrl, setAutoJoin, setUser, updateProfile }) => {
  const [name, setName] = useState(userName);
  const [avatar, setAvatar] = useState(avatarUrl);
  const [autoJoin, setAutoJoinState] = useState(false);

  const profileUpdated = name !== userName || avatar !== avatarUrl;

  useEffect(() => {
    /**
     * Set the user details
     */
    sendActiveTabMessage({ name: ChromeRuntimeMessages.GET_USER_DETAILS }, ({ data: { user } }) => {
      setUser(user);
    });
  }, [setUser]);

  useEffect(() => {
    setName(userName);
    setAvatar(avatarUrl);
    getAutoJoin().then(setAutoJoinState);
  }, [userName, avatarUrl]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleUpdateProfile = async () => {
    if (!profileUpdated) return;
    if (!name || !avatarUrl) return;

    updateProfile({
      avatarUrl: avatar!,
      name: name!,
    });
  };

  const handleSetAutoJoin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoJoin(e.target.checked);
  };

  const handleAvatarChange = () => {
    const spriteType = 'gridy';
    const rand = Math.random().toString(36).substring(7);
    const dicebearUrl = `https://avatars.dicebear.com/api/${spriteType}/${encodeURIComponent(rand)}.svg`;

    setAvatar(dicebearUrl);
  };

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" alignItems="center" justifyContent="center" padding={2}>
        <Avatar src={avatar} width={75} height={75} />
        <IconButton style={{ marginTop: theme.space[2] }} onClick={handleAvatarChange}>
          <FontAwesomeIcon icon={faRandom} size="2x" />
        </IconButton>
      </Flex>
      <Text fontSize={1} color="greyDark" ml={1} fontWeight={700}>
        display name
      </Text>
      <Input value={name} onChange={handleNameChange} mb={1} />
      <Button mt={1} mb={1} onClick={handleUpdateProfile} disabled={!profileUpdated}>
        <Text fontSize={2} fontWeight={400}>
          update profile
        </Text>
      </Button>
      <Label fontSize={2} color="secondary" fontWeight={400} padding={1} marginTop={1}>
        <Checkbox onChange={handleSetAutoJoin} defaultChecked={autoJoin} />
        Set Party Auto Join
      </Label>
    </Flex>
  );
};

export default connector(Profile);
