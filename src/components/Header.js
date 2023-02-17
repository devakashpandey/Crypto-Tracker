import React from 'react';
import "./Header.css";
import AppBar from '@mui/material/AppBar';  // for navbar
import Box from '@mui/material/Box';  // for nav & select box
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';  // for responsivness
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';  // for navigation
import { ThemeProvider, createTheme } from '@mui/material/styles';  // dark mode hooks
import { UseCryptoValue } from "../context/CryptoContext"

const currencies = [
                      {
                        value: "USD",
                        label: `USD $`,
                      },
                      {
                        value: `INR`,
                        label: `INR ₹`,
                      },
                    ];

const Header = () => {

  const navigate = useNavigate()
  const { currency, setCurrency } = UseCryptoValue()

  const myLogo = () => {
    navigate("/")
  }

  // --- this for the dark mode ----
  const darkTheme = createTheme({
       palette: {
          mode: 'dark',
       },
 });
 
return (

    <>
 <ThemeProvider theme={darkTheme}> {/* wrap this dar mode theme provider to whole nav */}
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
        <Toolbar>
            
          <Typography variant="h6" className='crypto-title'
          component="div" sx={{ flexGrow: 1 }} onClick={myLogo}>
            Crypto Tracker
          </Typography>

         {/*-------- this is for select option --------- */}
          <Box component="form" noValidate autoComplete="off" >

        <TextField 
          id="outlined-select-currency"
          select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {currencies?.map((option) => (
            <MenuItem className='select-field' key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
         </Box>
         {/*------ select option end ------*/}
        
        </Toolbar>
        </Container>
      </AppBar>
     </Box>  {/* ----end of navbar box---- */}
  </ThemeProvider>
    </>
  )
}

export default Header;