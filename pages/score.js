import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import MainContext from "../context/mainContext";
import { useRouter } from "next/router";
import styled from "styled-components";
import Leaderboard from "../components/Leaderboard";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  // height: 100vh;
  // width: 100vw;
`;

const FinalScreen = () => {
  const {
    score,
    questions,
    points,
    setPoints,
    setScore,
    setQuestions,
    dispatch,
    initialState,
    setScoreProgress,
    ACTIONS,
  } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBackToMenu = () => {
    setIsLoading(true);
    setQuestions([]);
    setScore(0);
    setPoints(0);
    setScoreProgress(0);
    dispatch({ type: ACTIONS.RESET_ALL });
    router.replace("/");
    // setIsLoading(false)
  };

  const Loading = styled.div`
    overflow: hidden;
  `;

  if (isLoading) {
    return (
      <Loading>
        <Box mt={20}>
          <CircularProgress />
        </Box>
      </Loading>
    );
  }

  return (
    <>
      <Main>
        <Leaderboard />
      </Main>
      <br />
      <Button onClick={handleBackToMenu} variant="outlined">
        Back to Main Menu!
      </Button>
    </>
  );
};

export default FinalScreen;
