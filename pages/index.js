import { Inter } from "@next/font/google";
import { Box, Button, Typography } from "@mui/material";
import SelectField from "../components/SelectField";
import TextFieldComponent from "../components/TextField";
import axios from "axios";
import { useContext, useState } from "react";
import MainContext from "../context/mainContext";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const Container = styled.div`
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
`;

axios.defaults.baseURL = "https://opentdb.com/";

export const getStaticProps = async () => {
  const response = await axios.get("/api_category.php");
  const categories = await response.data;

  return {
    props: {
      categories,
    },
  };
};

export default function Home({ categories }) {
  const [categoryError, setCategoryError] = useState(false);
  const [difficultyError, setDifficultyError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const router = useRouter();

  const {
    category,
    difficulty,
    type,
    amount,
    loading,
    error,
    setUrl,
    dispatch,
    getQuestions,
    validateField,
    ACTIONS,
  } = useContext(MainContext);

  const setCategory = (category) =>
    dispatch({ type: ACTIONS.SET_CATEGORY, payload: category });
  const setDifficulty = (difficulty) =>
    dispatch({ type: ACTIONS.SET_DIFFICULTY, payload: difficulty });
  const setType = (type) => dispatch({ type: ACTIONS.SET_TYPE, payload: type });
  const setAmount = (amount) =>
    dispatch({ type: ACTIONS.SET_AMOUNT, payload: amount });

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choice" },
    { id: "boolean", name: "True/False" },
  ];

  /* if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  } */

  if (error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Something went wrong!
      </Typography>
    );
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const isCategoryValid = validateField(category, setCategoryError);
    const isDifficultyValid = validateField(difficulty, setDifficultyError);
    const isTypeValid = validateField(type, setTypeError);
    const isAmountValid = validateField(amount, setAmountError);

    if (isCategoryValid && isDifficultyValid && isTypeValid && isAmountValid) {
      //  setUrl(url);
      getQuestions();
      console.log("Goes to next page!");
      router.replace("/questions");
    } else {
      console.log("All fields must be full");
    }
  };

  return (
    <Container>
      <Typography variant="h2" color="black" fontWeight="bold">
        Quiz App
      </Typography>
      <form onSubmit={submitHandler}>
        <SelectField
          options={categories.trivia_categories}
          setParam={setCategory}
          label="Category"
          error={categoryError}
          setError={setCategoryError}
        />
        <SelectField
          options={difficultyOptions}
          setParam={setDifficulty}
          label="Difficulty"
          error={difficultyError}
          setError={setDifficultyError}
        />
        <SelectField
          options={typeOptions}
          setParam={setType}
          label="Type"
          error={typeError}
          setError={setTypeError}
        />
        <TextFieldComponent
          setParam={setAmount}
          error={amountError}
          setError={setAmountError}
        />
        <Box mt={3} width="100%">
          <Button fullWidth variant="contained" type="submit">
            Get Started
          </Button>
        </Box>
      </form>
    </Container>
  );
}
