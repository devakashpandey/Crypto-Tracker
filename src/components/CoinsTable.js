import React, { useEffect, useState } from 'react';
import "./CoinsTable.css";
import { UseCryptoValue } from "../context/CryptoContext";
import axios from 'axios';
import { CoinList } from '../config/api';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';


const CoinsTable = () => {

 const [ coins, setCoins ] = useState([])
 const [ loading, setLoading ] = useState(false)

 const { currency } = UseCryptoValue()

 const fetchCoins = async () => {

      setLoading(true)
      const { data } = await axios.get(CoinList(currency))

      setCoins(data)
      setLoading(false) 
}

console.log(coins)

useEffect(() => {
   fetchCoins()          
},[currency])

  // --- this for the dark mode ----
  const darkTheme = createTheme({
      palette: {
         mode: 'dark',
      },
 });

  return (
     <>
     <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign : "center" }}>
           <h2 className='coins-title'>
           Cryptocurrency Prices By Market Cap
           </h2>

           <TextField className='coins-textfield' label="Search For a Coin" type="text"/>

        </Container>
     </ThemeProvider>
     </>
  )
}

export default CoinsTable;
