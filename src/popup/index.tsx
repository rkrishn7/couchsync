import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Box } from 'rebass';
import styled from '../style/styled';
import theme from '../style/theme';
import './popup.css';

const Root = styled(Box)`
  background-color: ${p => p.theme.colors.primary};
  padding: 5px;
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Box>Hello</Box>
      </Root>
    </ThemeProvider>
  );
}

export default App;
