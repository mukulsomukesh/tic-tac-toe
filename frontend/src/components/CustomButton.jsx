import { Button, Center, Icon, useTheme } from '@chakra-ui/react';
import React from 'react';
import "../App.css";
import { useDispatch } from 'react-redux';

export default function CustomButton({ text, closeModal, icon }) {

  // define chakra theme 
  const theme = useTheme();

  // define dispatch
  const dispatch = useDispatch();

  // handel button click function
  const handelButtonClick = () => {

    // close modal
    closeModal();

    // deipatch "SELECT_PLAY_MODE"
    dispatch({ type: 'SELECT_PLAY_MODE', payload: text });

  };

  return (
    <Button
      px={4}
      onClick={handelButtonClick}
      m={4}
      fontSize={'sm'}
      rounded={'full'}
      bg={theme.colors.brand[100]}
      color={'white'}
      boxShadow={
        '0px 1px 25px -5px rgba(255, 146, 62, 0.48), 0 10px 10px -5px rgba(255, 146, 62, 0.43)'
      }
      _hover={{
        color: theme.colors.brand[300],
      }}
      _focus={{
        bg: theme.colors.brand[200],
        color: theme.colors.brand[50],
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      leftIcon={<Icon as={icon} />}
    >
    
      {text}
   
    </Button>
  );
}
