import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import MainContext from "../context/mainContext";
import { useRouter } from "next/router";

const FinalScreen = () => {
  const {
    score,
    questions,
    setScore,
    setQuestions,
    dispatch,
    initialState,
    ACTIONS,
  } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBackToMenu = () => {
    setIsLoading(true);
    setQuestions([]);
    setScore(0);
    dispatch({ type: ACTIONS.RESET_ALL });
    router.replace("/");
    // setIsLoading(false)
  };

  if (isLoading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mt={30}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Final Score: {score} / {questions.length}
      </Typography>
      <Button onClick={handleBackToMenu} variant="outlined">
        Back to Main Menu!
      </Button>
    </Box>
  );
};

export default FinalScreen;
