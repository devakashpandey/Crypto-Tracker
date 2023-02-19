import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./CoinChart.css";
import { HistoricalChart } from '../config/api';
import { UseCryptoValue } from "../context/CryptoContext";
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { Line } from "react-chartjs-2"

const CoinChart = ({coin}) => {

 const [chartData, setChartData] = useState();
 const [days, setDays] = useState(1);

 const { currency } =  UseCryptoValue();

 const fetchChartData = () => {
    const { data } = axios.get(HistoricalChart(coin.id, days, currency))
    
    setChartData(data?.prices)
}

useEffect(() => {
   fetchChartData()
}, [currency, days])


  // --- this for the dark mode ----
  const darkTheme = createTheme({
     palette: {
     mode: 'dark',
    },
});


  return (
      <>
      <ThemeProvider theme={darkTheme}>
        <div className='chart-container'>

          {
            !chartData ? ( 
               <CircularProgress thickness={2} size={200}/>
            ) : (
              <>
              <Line />
              
              </>
            )
          }
            
        </div>
       </ThemeProvider>
      </>
  )
}

export default CoinChart;
