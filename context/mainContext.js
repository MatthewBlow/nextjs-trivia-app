import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const MainContext = createContext();

axios.defaults.baseURL = "https://opentdb.com/";

export const Provider = ({ children }) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([])
  const [questions, setQuestions] = useState([])
  const [url, setUrl] = useState("")
  
  axios.defaults.baseURL = "https://opentdb.com/";

  useEffect(() => {
    const fetchQuestions = async() => {
      try {
          const response = await axios.get(url);
          setQuestions(response.data.results)
          console.log(response.data.results)
       /*   console.log(response.data.results)
          console.log(categories.trivia_categories) */
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [url])
  

  const mainContextVaues = {
    questions,
    categories,
    loading,
    error,
    setUrl,
    url
  }

  return <MainContext.Provider value={mainContextVaues}>{children}</MainContext.Provider>
}

export default MainContext;