import React from 'react';
import { Box, Flex, Heading, useTheme } from '@chakra-ui/react';
import pic from "./assets/tic-tac-toe.gif";
import CustomButton from './components/CustomButton';
import './App.css'; 

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
      <Box
        textAlign="center" 
        width={{ base: "100%", md: "auto" }} 
        my={{ base: 4, md: 0 }} 
      >
        <Heading color={theme.colors.brand[300]}> Welcome To Tic-Tac-Toe </Heading>
        <CustomButton text="Play With Computer" />
        <CustomButton text="Play With Friend" />
      </Box>
    </Flex>
  );
}

export default App;
