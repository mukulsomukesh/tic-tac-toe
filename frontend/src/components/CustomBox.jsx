import { Box, useTheme } from '@chakra-ui/react';
import React from 'react';

export default function CustomBox({ item, onClick, isWinner, backGround, textColor }) {


  const handleClick = () => {
    if (!isWinner && item !== "O" && item !== "X") {
      onClick();
    }
  };

  return (
    <Box
      w="100px" 
      h="100px" 
      bg={backGround}
      borderRadius="md" 
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="md" 
      fontSize="7xl" 
      fontWeight="bold" 
      color={textColor} 
      onClick={handleClick}
      cursor={(isWinner || item === "O" || item === "X") ? "not-allowed" : "pointer"}
    >
      {item}
    </Box>
  );
}
