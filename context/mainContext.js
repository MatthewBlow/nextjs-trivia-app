import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";

const MainContext = createContext();

const ACTIONS = {
  SET_CATEGORY: "SET_CATEGORY",
  SET_DIFFICULTY: "SET_DIFFICULTY",
  SET_TYPE: "SET_TYPE",
  SET_AMOUNT: "SET_AMOUNT",
  RESET_ALL: "RESET_ALL",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CATEGORY:
      return { ...state, category: action.payload };
    case ACTIONS.SET_DIFFICULTY:
      return { ...state, difficulty: action.payload };
    case ACTIONS.SET_TYPE:
      return { ...state, type: action.payload };
    case ACTIONS.SET_AMOUNT:
      return { ...state, amount: action.payload };
    case ACTIONS.RESET_ALL:
      return {
        category: "",
        difficulty: "",
        type: "",
        amount: "",
      };
    default:
      return state;
  }
};

axios.defaults.baseURL = "https://opentdb.com/";

export const Provider = ({ children }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [url, setUrl] = useState("");
  const [score, setScore] = useState(0);

  const [urlParams, dispatch] = useReducer(reducer, {
    category: "",
    difficulty: "",
    type: "",
    amount: "",
  });

  const { category, difficulty, type, amount } = urlParams;

  let requestedUrl = `/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

  axios.defaults.baseURL = "https://opentdb.com/";

  const validateField = (field, setError) => {
    if (!field) {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };

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

  const mainContextVaues = {
    questions,
    categories,
    loading,
    error,
    url,
    score,
    category,
    difficulty,
    type,
    amount,
    setUrl,
    setScore,
    getQuestions,
    setQuestions,
    validateField,
    dispatch,
    ACTIONS,
  };

  return (
    <MainContext.Provider value={mainContextVaues}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
