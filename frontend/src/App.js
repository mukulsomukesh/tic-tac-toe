import React from 'react';
import { Box, Flex, useTheme } from '@chakra-ui/react';
import './App.css';
import PlayBoardScreen from './components/PlayBoardScreen';

function App() {
  // Get the theme object using the useTheme hook
  const theme = useTheme();


  return (
    <Flex
      alignItems="center"
      justifyContent="space-evenly"
      h="100vh"
      bg={theme.colors.brand[50]}
    >
      <PlayBoardScreen />

    </Flex>
  );
}

export default App;
