import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useSound from 'use-sound';

import oSoundFile from "../assets/o_sound.mp3";
import xSoundFile from "../assets/x_sound.mp3";
import { useSelector } from 'react-redux';

export default function CustomBox({ item, onClick, isWinner, backGround, textColor }) {

  const musicPlay = useSelector((state) => state.appReducer.musicPlay)
  const [playOSound] = useSound(oSoundFile);
  const [playXSound] = useSound(xSoundFile);


  // handel click event
  const handleClick = () => {
    if (!isWinner && item !== "O" && item !== "X") {
      onClick();
    }
  };

  useEffect(()=>{

    // play sound
    if (item == "O" && !musicPlay) {
      playOSound();
    }
    else if (item === "X" && !musicPlay) {
      playXSound();
    }
  },[item])

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
