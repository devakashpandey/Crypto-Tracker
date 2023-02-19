import React, { useEffect, useState } from 'react'
import "./CoinPage.css";
import { useParams } from 'react-router-dom';
import { UseCryptoValue } from "../context/CryptoContext";
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinChart from '../components/CoinChart';
import { numberWithCommas } from '../components/Carousel';
import { LinearProgress } from '@mui/material';

const CoinPage = () => {

  const { id } =  useParams();
  const [ coin, setCoin ] = useState("")
 
  const { currency, symbol } = UseCryptoValue()

  const fetchCoin = async () =>{
     const { data } = await axios.get(SingleCoin(id))

     setCoin(data)
  }

  useEffect(() => {
     fetchCoin()
  }, [])

  if(!coin) return <LinearProgress />  // for loading

  return (
      <>
      <div className='container'>
        <div className='coin-info'>

        <img
            src={coin?.image?.large}
            alt={coin.name}
            height="200" 
            style={{ marginBottom: 20 }}
        />

        <h2>{coin.name}</h2>

        <p className='coin-descrip'> 
           {/* this for redering only html stuffs */}
        <span dangerouslySetInnerHTML = {{ __html :coin?.description?.en.split(". ")[0]}}/>.
        </p>

        <div className='market-data'>
           <span style={{ display: "flex" }}>
             <h3>Rank : &nbsp;</h3>
             <h4>{coin?.market_cap_rank}</h4>
           </span>

           <span style={{ display: "flex", marginTop: 15 }}>
             <h3>Current Price : &nbsp;</h3>
             <h4>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
              
             </h4>
           </span>

           <span style={{ display: "flex" , marginTop: 15}}>
             <h3>Market Cap : &nbsp;</h3>
             <h4>
              {symbol}{" "}
                {numberWithCommas(
                   coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6)
               )} M
               </h4>
           </span>
        </div>

        </div>

        <CoinChart coin={coin}/>

      </div>
      </>
  )
}

export default CoinPage;
