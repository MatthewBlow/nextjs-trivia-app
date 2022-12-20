import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const MainContext = createContext();

axios.defaults.baseURL = "https://opentdb.com/";

export const Provider = ({ children }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [url, setUrl] = useState("");

  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [score, setScore] = useState(0);

  let requestedUrl = `/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

  axios.defaults.baseURL = "https://opentdb.com/";

  const getQuestions = async () => {
    try {
      const response = await axios.get(requestedUrl);
      //  const data = await response.json();
      setQuestions(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /*
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(requestedUrl);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [url]); */

  const mainContextVaues = {
    questions,
    categories,
    loading,
    error,
    url,
    score,
    setCategory,
    setDifficulty,
    setType,
    setAmount,
    setUrl,
    setScore,
    getQuestions,
  };

  return (
    <MainContext.Provider value={mainContextVaues}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
