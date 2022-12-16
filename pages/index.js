import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Container } from '@mui/system'
import { Box, Button, TextField, Typography } from '@mui/material'
import SelectField from '../components/SelectField'
import TextFieldComponent from '../components/TextField'
import axios from 'axios'
import { useContext } from 'react'
import MainContext from '../context/mainContext'

const inter = Inter({ subsets: ['latin'] })

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export async function getStaticProps() {
  const { data, error, loading } = useData();
  return {
    props: {
      data,
      error,
      loading,
    },
  };
}

export default function Home({data, error, loading}) {
 // const { response, error, loading } = useAxios({ url: "/api_category.php"})
  console.log(data)
  const submitHandler = (e) => {
    e.preventDefault(); 
  }

  return (
    <div>
      <Typography variant='h2' color="black" fontWeight='bold'>
        Quiz App
      </Typography>
      <form onSubmit={submitHandler}>
        <SelectField label="Category" />
        <SelectField label="Difficulty" />
        <SelectField label="Type" />
        <TextFieldComponent />
        <Box mt={3} width="100%">
          <Button fullWidth variant="contained" type="submit">
            Get Started
          </Button>
        </Box>
      </form>
    </div>
  )
}
