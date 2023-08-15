import { Grid, useTheme } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import CustomBox from './CustomBox';
import useSound from 'use-sound';
import result from "../assets/result.mp3"
import { useSelector } from 'react-redux';

export default function CardContainer() {

  // define states
  const [arr, setArr] = useState(["", "", "", "", "", "", "", "", ""]);
  const [userTurn, setUserTurn] = useState("O");
  const [winner, setWinner] = useState(null);
  const [winnerBox, setWinnerBox] = useState([])
  const theme = useTheme();
  const [platResultSound] = useSound(result);
  const playMode = useSelector((state) => state.appReducer.playMode)


  useEffect(() => {

    // check if any user win
    checkWinner();

    // If it's the computer's turn
    if (!winner && userTurn === "X" && playMode === "Play With Computer") {

      // timeout
      const computerMoveTimeout = setTimeout(() => {
        handelComputerTurn();
      }, 1000);

      // Cleanup on setTimeout
      return () => clearTimeout(computerMoveTimeout);
    }

  }, [arr, userTurn]);


  // check winner function
  const checkWinner = () => {

    // winning combo array
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

        //  play sound
        platResultSound()
        return;
      }
    }

    // Check for draw
    if (!arr.includes("")) {

      // play sound
      platResultSound()

      setWinner("draw");
    }
  };


  // chandel box click function
  const handleBoxClick = (index) => {
    if (!winner && arr[index] === "") {
      const updatedArr = [...arr];
      updatedArr[index] = userTurn;

      // toggle user turn
      setUserTurn((prevTurn) => (prevTurn === "O" ? "X" : "O"));

      setArr(updatedArr);
    }
  };


  // handel computer turn function
  const handelComputerTurn = () => {

    // Find an available empty box for the computer's move
    const emptyBoxes = arr.reduce((emptyIndices, item, index) => {
      if (item === "") {
        emptyIndices.push(index);
      }
      return emptyIndices;
    }, []);


    // if empty box available
    if (emptyBoxes.length > 0) {

      // select a random box from emptyBoxes
      const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
      const computerMoveIndex = emptyBoxes[randomIndex];
      const updatedArr = [...arr];
      updatedArr[computerMoveIndex] = "X";

      // update array
      setArr(updatedArr);

      // change turn
      setUserTurn("O");
    }
  };
  

  return (
    // box grid
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>

    {/* map array */}
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
