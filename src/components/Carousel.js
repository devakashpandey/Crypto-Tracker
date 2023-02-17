import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Carousel.css";
import { TrendingCoins } from '../config/api';
import { UseCryptoValue } from "../context/CryptoContext";
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';


export const numberWithCommas = (x) =>{  // format for showing numbers with comma
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const Carousel = () => {
 const [trending, setTrending] = useState([])

 const { currency, symbol } = UseCryptoValue()

 const fetchTrendingCoins = async () => {
      const { data } = await axios.get(TrendingCoins(currency))
      setTrending(data)
 }

 useEffect(() => {
    fetchTrendingCoins()
 }, [currency])

 const items = trending.map((coin) => {

  let profit = coin.price_change_percentage_24h >= 0;

       return (
          <Link className='carousel-item' 
          to={`/coins/${coin.id}`}>
            <img
            src={coin?.image}
            alt={coin.name}
            height="80" 
           /> 
            <span> 
              {coin.symbol} &nbsp;
                <span style={{ color: profit > 0 ? "rgba(14,203,129)" : "red" , fontWeight:600}}> 
                  { profit && "+" } 
                  {coin?.price_change_percentage_24h?.toFixed(2)}% 
                </span>
            </span>
           <span style={{fontSize: 22, fontWeight: 600}}>
              {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
           </span>
          </Link>
           
          )
 })

 const responsive = {
    0: {   // if it is 0px or higher it display 2 items
      items: 2,
    },
    512: {    // if it is 512px or higher it display 4 items
      items: 4
    }
 }


  return (
    <>
    <div className='my-carousel'>
          <AliceCarousel 
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          autoPlay
          responsive={responsive}
          items={items}
          disableButtonsControls
         
          />
     </div>
    </>
  )
}

export default Carousel;
