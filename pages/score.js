import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import MainContext from "../context/mainContext";
import { useRouter } from "next/router";

const FinalScreen = () => {
  const { score, questions, setScore } = useContext(MainContext);
  const router = useRouter();

  const handleBackToMenu = () => {
    setScore(0);
    router.replace("/");
  };

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
