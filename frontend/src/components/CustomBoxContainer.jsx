import { Grid, useTheme } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import CustomBox from './CustomBox';
import useSound from 'use-sound';
import result from "../assets/result.mp3"

export default function CardContainer() {
  const [arr, setArr] = useState(["", "", "", "", "", "", "", "", ""]);
  const [userTurn, setUserTurn] = useState("O"); 
  const [winner, setWinner] = useState(null); 
  const [winnerBox, setWinnerBox] = useState([])
  const theme = useTheme();
  const [platResultSound] = useSound(result);


  useEffect(() => {
    checkWinner();
  }, [arr]);

  const checkWinner = () => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6] 
    ];

    // check for winner
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
        setWinner(arr[a]);
        setWinnerBox(combo);
        platResultSound()
        return;
      }
    }

    // Check for draw
    if (!arr.includes("")) {
      platResultSound()
      setWinner("draw");
    }
  };

  const handleBoxClick = (index) => {
    if (!winner && arr[index] === "") { 
      const updatedArr = [...arr];
      updatedArr[index] = userTurn;
      
      setUserTurn((prevTurn) => (prevTurn === "O" ? "X" : "O"));

      setArr(updatedArr);
    }
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      {arr.map((item, index) => (
        <CustomBox 
          item={item} 
          key={index} 
          textColor={winnerBox && winnerBox.includes(index) ? theme.colors.brand[200] : theme.colors.brand[100]}
          backGround={winnerBox && winnerBox.includes(index) ? theme.colors.brand[100] : theme.colors.brand[200]}
          onClick={() => handleBoxClick(index)} 
          isWinner={winner && winner !== "draw" && winner === item}
        >
          {item}
        </CustomBox>
      ))}
    </Grid>
  );
}
