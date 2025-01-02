import { Box, Grid, Text, useTheme } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import CustomBox from './CustomBox';
import useSound from 'use-sound';
import result from "../assets/result.mp3"
import { useDispatch, useSelector } from 'react-redux';
import Users from './Users';

export default function CardContainer() {
  // Define states
  const [arr, setArr] = useState(["", "", "", "", "", "", "", "", ""]);
  const [userTurn, setUserTurn] = useState("O");
  const [winner, setWinner] = useState(null);
  const [winnerBox, setWinnerBox] = useState([]);
  const theme = useTheme();
  const [platResultSound] = useSound(result);
  const playMode = useSelector((state) => state.appReducer.playMode);
  const [resetCountdown, setResetCountDown] = useState(3);
  const dispatch = useDispatch();
  const musicPlay = useSelector((state) => state.appReducer.musicPlay);

  useEffect(() => {
    // Check if any user won
    checkWinner();

    // If it's the computer's turn
    if (!winner && userTurn === "X" && playMode === "Play With Computer") {
      // Timeout
      const computerMoveTimeout = setTimeout(() => {
        handelComputerTurn();
      }, 600);

      // Cleanup on setTimeout
      return () => clearTimeout(computerMoveTimeout);
    }
  }, [arr, userTurn, winner]);

  // Check winner function
  const checkWinnerHelper = (board) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winner ("X" or "O")
      }
    }

    if (!board.includes("")) {
      return "draw"; // No winner, board is full
    }

    return null; // Game is still ongoing
  };

  const minimax = (board, isMaximizing) => {
    const winner = checkWinnerHelper(board);

    // Scoring system
    if (winner === "X") return 10;  // Computer wins
    if (winner === "O") return -10; // Human wins
    if (winner === "draw") return 0; // Draw

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "X"; // Computer move
          const score = minimax(board, false);
          board[i] = ""; // Undo move
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "O"; // Human move
          const score = minimax(board, true);
          board[i] = ""; // Undo move
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const handelComputerTurn = () => {
    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "") {
        arr[i] = "X"; // Simulate computer move
        const score = minimax(arr, false);
        arr[i] = ""; // Undo move

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    if (move !== null) {
      const updatedArr = [...arr];
      updatedArr[move] = "X"; // Make the optimal move
      setArr(updatedArr);
      setUserTurn("O"); // Switch turn to human
    }
  };

  // Check winner function
  const checkWinner = () => {
    if (winner) {
      return null;
    }

    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
        setWinner(arr[a]);
        setWinnerBox(combo);

        // Play sound
        if (!musicPlay) {
          platResultSound();
        }

        // Dispatch
        if (arr[a] === "O") {
          dispatch({ type: 'O_WON' });
        } else if (arr[a] === "X") {
          dispatch({ type: 'X_WON' });
        }

        handelReset();
        return;
      }
    }

    if (!arr.includes("")) {
      handelReset();
      if (!musicPlay) {
        platResultSound();
      }
      setWinner("draw");
    }
  };

  // Handle box click function
  const handleBoxClick = (index) => {
    if (userTurn === "X" && playMode === "Play With Computer") {
      return null;
    }

    if (!winner && arr[index] === "") {
      const updatedArr = [...arr];
      updatedArr[index] = userTurn;
      setUserTurn((prevTurn) => (prevTurn === "O" ? "X" : "O"));
      setArr(updatedArr);
    }
  };

  // Reset the game function
  const handelReset = () => {
    const resetCountdownInterval = setInterval(() => {
      setResetCountDown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(resetCountdownInterval);
    }, 3000);
  };

  useEffect(() => {
    if (resetCountdown === 0) {
      setArr(["", "", "", "", "", "", "", "", ""]);
      setUserTurn("O");
      setWinner(null);
      setWinnerBox([]);
      setResetCountDown(3);
    }
  }, [resetCountdown]);

  return (
    <Box>
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

      {winner ? <Text align={"center"} as="b"> Reset play board in {resetCountdown} </Text> : ""}
      <Users />
    </Box>
  );
}
