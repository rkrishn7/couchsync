import React, { useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Flex, Text } from 'rebass';
import { Input } from '@rebass/forms';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from '@root/style/styled';

import { StoreState } from '@popup/store';

import http from '@root/lib/http';
import socket from '@contentScript/socket';
import { debug } from '@root/lib/utils/debug';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

const Container = styled(Flex)`
  flex-direction: column;
  min-width: 100%;
  padding: ${p => p.theme.space[2]}px;
`;

const RoomDisplay = styled(Input)`
  flex: 1;
  border-radius: ${p => p.theme.radii[2]}px;
  font-size: 14px;
  margin-top: ${p => p.theme.space[2]}px;
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

const CopyButton = styled.button`
  width: 40px;
  height: 40px;
  margin-right: ${p => p.theme.space[2]}px;
  margin-left: ${p => p.theme.space[2]}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  outline: none;
  color: ${p => p.theme.colors.secondary};
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
  return {
    joinUrl: state.party.joinUrl,
  };
};

const connector = connect(mapState, null);

type ReduxProps = ConnectedProps<typeof connector>;

const ActiveParty: React.FC<ReduxProps> = ({ joinUrl }) => {
  const roomDisplayRef = useRef<HTMLInputElement>();
  const [copiedJoinUrl, setCopiedJoinUrl] = useState(false);
  const [newName, setNewName] = useState('');

  const handleCopyClick = () => {
    if (roomDisplayRef) {
      roomDisplayRef.current!.select();
      document.execCommand('copy');
      setCopiedJoinUrl(true);
    }
  };

  const handleSetNewName = () => {
    setNewName('blah');
  };

  const handleSubmitUserName = async () => {
    try {
      await http.post('/user/changeName', {
        newUserName: newName,
        socketId: socket.id,
      });
    } catch (error) {
      debug(error.message);
    }
  };

  return (
    <Container>
      <Tabs>
        <TabList>
          <Tab>Party</Tab>
          <Tab>Change Name</Tab>
        </TabList>
        <TabPanel>
          <Text fontSize={2} textAlign="center">
            Share the code with your friends
          </Text>
          {joinUrl && (
            <Flex flexDirection="row" alignItems="center">
              <RoomDisplay value={joinUrl} readOnly ref={roomDisplayRef} />
              <CopyButton onClick={handleCopyClick}>
                <FontAwesomeIcon icon={copiedJoinUrl ? faClipboardCheck : faClipboard} size="2x" />
              </CopyButton>
            </Flex>
          )}
        </TabPanel>
        <TabPanel>
          <form onSubmit={handleSubmitUserName}>
            <label>
              New username:
              <input type="text" onChange={handleSetNewName} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </TabPanel>
      </Tabs>
    </Container>
  );
};

export default connector(ActiveParty);
