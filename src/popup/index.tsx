import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Box, Card, Flex, Heading } from 'rebass';
import styled from '../style/styled';
import theme from '../style/theme';
import './popup.css';

const Root = styled(Box)`
  background-color: ${p => p.theme.colors.muted};
  padding: ${p => p.theme.space[2]}px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Backing = styled(Card)`
  width: 100%;
  height: 100%;
  border-radius: ${p => p.theme.radii.default}px;
  display: flex;
  flex-direction: column;
  padding: ${p => p.theme.space[2]}px;
`;

const BrandContainer = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Backing>
          <BrandContainer>
            <Heading color="primary">Couch Sync</Heading>
          </BrandContainer>
        </Backing>
      </Root>
    </ThemeProvider>
  );
}

export default App;
