import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { decode } from "html-entities";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import MainContext from "../context/mainContext";
import { useAxios } from "../hooks/useAxios";
import styled from "styled-components";

const QuestionBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
  margin: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Answer = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const { error, questions, setScore, score, url } = useContext(MainContext);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (questions.length) {
      const question = questions[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setIsLoading(false);
      setOptions(answers);
    }
  }, [questions, questionIndex]);

  /* useEffect(() => {
    if (!questions.length) router.replace("/");
  }, [questions]); */

  if (isLoading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Something went wrong!
      </Typography>
    );
  }

  const handleClickAnswer = (e) => {
    setProgress(progress + 10);
    const question = questions[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      setScore(score + 1);
    }

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      router.replace("/score");
    }
  };

  // Score: {score} / {questions.length}

  return (
    <Box>
      <Typography variant="h4">Question {questionIndex + 1}</Typography>
      <Typography mt={5}>
        {decode(questions[questionIndex].question)}
      </Typography>
      {options.map((data, id) => (
        <QuestionBox key={id}>
          <Answer onClick={handleClickAnswer}>
            <Button variant="text">{decode(data)}</Button>
          </Answer>
        </QuestionBox>
      ))}
      <Box mt={5}>
        <CircularProgress size="8rem" variant="determinate" value={progress} />
      </Box>
    </Box>
  );
};

export default Questions;
