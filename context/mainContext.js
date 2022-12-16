import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const MainContext = createContext();

export const Provider = ({ children }) => {
 /* const [state, setState] = useState({
    data: null,
    error: null,
    loading: true,
  }); */

  const [questions, setQuestions] = useState([])

  const fetchQuestions = async() => {
    try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10');
        setQuestions(response.data)
    } catch (error) {
        
    }
  }

  const mainContextVaues = {
    questions,
    fetchQuestions
  }

  return <MainContext.Provider value={mainContextVaues}>{children}</MainContext.Provider>
}

export default MainContext;