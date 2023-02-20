import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./CoinChart.css";
import { HistoricalChart } from '../config/api';
import { UseCryptoValue } from "../context/CryptoContext";
import { Button, CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { Line } from 'react-chartjs-2';
import SelectButton from './SelectButton';

import { Chart as ChartJS, 
  CategoryScale,
  LinearScale, 
  PointElement, 
  LineElement } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  
);


const CoinChart = ({ coin }) => {

 const [chartData, setChartData] = useState();
 const [days, setDays] = useState(1);
 const [selected, useSelected] = useState(1)


 const { currency } =  UseCryptoValue();

 const fetchChartData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    setChartData(data?.prices)
}

console.log("data", chartData)

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
              <Line
              data={{
                   labels: chartData.map((coin) => {
                     let date = new Date(coin[0])
                     let time = date.getHours() > 12
                     ? `${date.getHours() -12}:${date.getMinutes()} PM`
                     : `${date.getHours()}:${date.getMinutes()} AM`;

                     return days === 1 ? time : date.toLocaleDateString()
                   }),
                 
                    datasets:[
                       { data:chartData.map((coin) => coin[1]),
                         label: `Price (Past ${days} Days) in ${currency}`,
                         borderColor: "rgb(7, 195, 237)"
                      },
                    ],
              }}
          
              // for removing the dots on the graph
             options={{ 
               elements: {
                 point:{
                      radius:1
                 }
               }
             }}     
              />
              {/* all buttons  */}
              <div className='my-btns'>  
               
               <SelectButton onClick={() => setDays(1)} selected={1 === days}>
                 24 Hours
               </SelectButton>

               <SelectButton onClick={() => setDays(30)} selected={ 30 === days}>
                 30 Days
               </SelectButton>

               <SelectButton onClick={() => setDays(90)}selected={ 90 === days}>
                 3 Months
               </SelectButton>

               <SelectButton onClick={() => setDays(240)} selected={ 240 === days}>
                 8 Months
               </SelectButton>

                <SelectButton onClick={() => setDays(365)} selected={ 365 === days} >
                  1 Year
                </SelectButton>

              </div>
              
              </>
            )
          }
            
        </div>
       </ThemeProvider>
      </>
  )
}

export default CoinChart;
