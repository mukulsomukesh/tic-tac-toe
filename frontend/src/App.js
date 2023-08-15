import React, { useState } from 'react';
import { Flex, useTheme } from '@chakra-ui/react';
import './App.css';
import PlayBoardScreen from './components/PlayBoardScreen';
import PlayMode from './components/PlayMode';
import { useSelector } from 'react-redux';

function App() {

  // define theme variable
  const theme = useTheme();
  const isPlayModeSelected = useSelector((state)=> state.appReducer.isPlayModeSelected )

  return (
    <Flex
      alignItems="center"
      justifyContent="space-evenly"
      h="100vh"
      bg={theme.colors.brand[50]}
    >
      {isPlayModeSelected ? (
        <PlayBoardScreen />
      ) : (
        <PlayMode />
      )}
    </Flex>
  );
}

export default App;
