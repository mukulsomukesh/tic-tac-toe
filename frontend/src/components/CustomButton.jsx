import { Button, Flex, useTheme } from '@chakra-ui/react'
import React from 'react';
import "../App.css"

export default function CustomButton({ text }) {
  const theme = useTheme();

  return (
    <Button
      px={4}
      m={4}
      mt={5}
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
    >
      {text}
    </Button>
  );
}
