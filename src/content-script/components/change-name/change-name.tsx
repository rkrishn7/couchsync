import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Flex } from 'rebass';
import { Input } from '@rebass/forms';
import styled from '@root/style/styled';

import { updateName } from '@contentScript/actions/user';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Container = styled(Flex)`
  flex-direction: column;
  min-width: 100%;
  padding: ${p => p.theme.space[2]}px;
`;

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

const mapDispatch = {
  updateName: (newName: string) => updateName(newName),
};

const connector = connect(null, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

const ChangeName: React.FC<ReduxProps> = ({ updateName }) => {
  const [newName, setNewName] = useState<string | null>(null);

  const handleSubmitUserName = () => {
    console.log(newName);
    if (newName) {
      updateName(newName);
      console.log('changed name');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  return (
    <Container>
      <Flex flexDirection="row">
        <NameInput placeholder="new name..." onChange={handleInputChange} />
        {/* Send Message */}
        <ToolbarButton>
          <FontAwesomeIcon icon={faPaperPlane} size="lg" onClick={handleSubmitUserName} />
        </ToolbarButton>
      </Flex>
    </Container>
  );
};

export default connector(ChangeName);
