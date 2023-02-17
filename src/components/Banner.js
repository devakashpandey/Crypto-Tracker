import { Container } from '@mui/material';
import React from 'react';
import "./Banner.css"
import Carousel from './Carousel';

const Banner = () => {
  return (
    <>
    <div className='banner'>
       <Container className="banner-Content">
          <div className="headline">
            <h1>Crypto Tracker</h1>
            <p>Get All The Info Regarding Your Favorite Crypto Currency</p>
          </div>

          <Carousel />
         
       </Container>
    </div>
    </>
  )
}

export default Banner;

