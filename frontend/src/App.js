import React, { useState } from 'react';
import { Flex, useTheme } from '@chakra-ui/react';
import './App.css';
import PlayBoardScreen from './components/PlayBoardScreen';
import PlayMode from './components/PlayMode';
import { useSelector } from 'react-redux';
import MuteButton from './components/MuteButton';


function App() {
  const theme = useTheme();
  const isPlayModeSelected = useSelector((state) => state.appReducer.isPlayModeSelected);

  return (
    <Flex
      alignItems="center"
      justifyContent="space-evenly"
      h="100vh"
      bg={theme.colors.brand[50]}
    >

      {/* load game is user select play mode  */}
      {isPlayModeSelected ? (
        <PlayBoardScreen />
      ) : (
        <PlayMode />
      )}

      {/* Add the MuteButton component */}
      <MuteButton />
    </Flex>
  );
}

export default App;
