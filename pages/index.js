import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { Container } from "@mui/system";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import SelectField from "../components/SelectField";
import TextFieldComponent from "../components/TextField";
import axios from "axios";
import { useContext, useState } from "react";
import MainContext from "../context/mainContext";
import useAxios from "../hooks/useAxios";

const inter = Inter({ subsets: ["latin"] });

axios.defaults.baseURL = "https://opentdb.com/";

/* export const getData = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}; */

export const getStaticProps = async () => {
  const response = await axios.get("/api_category.php");
  const categories = await response.data;

  // const { response, error, loading } = useAxios({ url: "/api_category.php"})
  return {
    props: {
      categories,
    },
  };
};

export default function Home({ categories }) {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");

  let url = `/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

  const { loading, error, setUrl } = useContext(MainContext);

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choice" },
    { id: "boolean", name: "True/False" },
  ];

  if (loading) {
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

  const submitHandler = (e) => {
    e.preventDefault();
    setUrl(url);
    console.log(url);
  };

  return (
    <div>
      <Typography variant="h2" color="black" fontWeight="bold">
        Quiz App
      </Typography>
      <form onSubmit={submitHandler}>
        <SelectField
          options={categories.trivia_categories}
          setParam={setCategory}
          label="Category"
        />
        <SelectField
          options={difficultyOptions}
          setParam={setDifficulty}
          label="Difficulty"
        />
        <SelectField options={typeOptions} setParam={setType} label="Type" />
        <TextFieldComponent setParam={setAmount} />
        <Box mt={3} width="100%">
          <Button fullWidth variant="contained" type="submit">
            Get Started
          </Button>
        </Box>
      </form>
    </div>
  );
}
