import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { decode } from "html-entities";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import MainContext from "../context/mainContext";
import styled from "styled-components";
import CircularProgressBarWithMeter from "../components/CircularProgressBarWithMeter";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 760px;
  height: 550px;
  overflow: hidden;
  // border: 1px solid black;
  margin: 0px 0px 0px 0px;
`;

const AnswerBoxes = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 50px 200px 0px 0px;
`;

const AnswerBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 100px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem;

  &:hover {
    transform: scale(1.1);
  }

  &.correct {
    background-color: #00ff00;
  }

  &.wrong {
    background-color: #ff0000;
  }
`;

const Answer = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const Loading = styled.div`
  overflow: hidden;
`;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const {
    error,
    questions,
    setScore,
    score,
    url,
    scoreProgress,
    setScoreProgress,
  } = useContext(MainContext);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(10);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      while (count !== 0) {
        setCount((prevCount) => prevCount - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    setScoreProgress((score / questions.length) * 100);
  }, [score]);

  const checkAnswer = (e, question) => {
    if (e.target.textContent === question.correct_answer) {
      setScore(score + 1);
      e.target.classList.add("correct");
      console.log(
        document.getElementById(
          ".answer-box:contains(" + question.correct_answer + ")"
        )
      );
    } else {
      e.target.classList.add("wrong");
      const correctAnswerBox = document.getElementById(
        ".answer-box:contains(" + question.correct_answer + ")"
      );
      //   correctAnswerBox.classList.add("correct");
    }
  };

  if (isLoading) {
    return (
      <Loading>
        <Box mt={20}>
          <CircularProgress />
        </Box>
      </Loading>
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
    setProgress((100 / questions.length) * (questionIndex + 1));
    const question = questions[questionIndex];

    const answerBoxes = document.querySelectorAll(".answer-box");
    answerBoxes.forEach((answerBox) => {
      answerBox.classList.remove("correct");
      answerBox.classList.remove("wrong");
    });

    checkAnswer(e, question);

    if (questionIndex + 1 < questions.length) {
      setTimeout(() => {
        setQuestionIndex(questionIndex + 1);
        e.target.classList.remove("correct");
        e.target.classList.remove("wrong");
      }, 2000);
    } else {
      setTimeout(() => {
        router.replace("/score");
      }, 1000);
    }
  };

  return (
    <Box>
      <Typography variant="h3">Question {questionIndex + 1}</Typography>
      <Typography mt={7} variant="h5">
        {decode(questions[questionIndex].question)}
      </Typography>
      <Container>
        <AnswerBoxes>
          {options.map((data, id) => (
            <AnswerBox key={id} id={`answer-${id}`} onClick={handleClickAnswer}>
              <Answer>
                <Button variant="text">{decode(data)}</Button>
              </Answer>
            </AnswerBox>
          ))}
        </AnswerBoxes>
        <Box mt={5} position="relative">
          <Box
            sx={{
              top: 40,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              sx={{ position: "absolute", top: -17, right: 85 }}
            >
              <h2>{`${score} - ${questions.length}`}</h2>
            </Typography>
          </Box>
          <CircularProgressBarWithMeter
            progress={scoreProgress}
            color="success"
          />
        </Box>
        <Box mt={25} position="relative">
          <CircularProgressBarWithMeter progress={progress} color="primary" />
        </Box>
        <Box mt={45} position="relative">
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 60,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
              sx={{ position: "absolute", right: 75 }}
            >
              <h2>{count}</h2>
            </Typography>
          </Box>
          <CircularProgressBarWithMeter
            progress={count * 10}
            color="secondary"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Questions;
