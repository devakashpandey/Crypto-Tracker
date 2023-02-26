import React, { useEffect, useState } from 'react';
import "./CoinsTable.css";
import { UseCryptoValue } from "../context/CryptoContext";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Pagination } from '@mui/material';
// import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Carousel';
import axios from 'axios';
import { CoinList } from '../config/api';



const CoinsTable = () => {

//  const [ search, setSearch ] = useState("")
 const [ page, setPage ] = useState(1)

 const { symbol, currency } = UseCryptoValue()
 const navigate = useNavigate()

   
 const [ coins, setCoins ] = useState([])
 const [ loading, setLoading ] = useState(false)


 const fetchCoins = async () => {

   setLoading(true)
   const { data } = await axios.get(CoinList(currency))  // COIN LIST OF CONIS TABLE

   setCoins(data)
   setLoading(false) 
}

 useEffect(() => {
   fetchCoins()          
 },[currency])



  // --- this for the dark mode ----
  const darkTheme = createTheme({
      palette: {
         mode: 'dark',
      },
 });

//  const handleSearch = () =>{
//      return coins.filter((coin) => {
//           coin.name.toLowerCase().includes(search) || 
//           coin.symbol.toLowerCase().includes(search)
//      })
//  }

  return (
     <>
     <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign : "center" }}>
           <h2 className='coins-title'>
           Cryptocurrency Prices By Market Cap
           </h2>

           {/* <TextField className='coins-textfield' 
             label="Search For a Coin" type="text"
             onChange={(e) => setSearch(e.target.value)}
            /> */}

            <TableContainer className='table-container'>
                      {
                        loading ? (<LinearProgress className='progress-bar'/>)  :
                        (
                          <Table>
                             <TableHead className='table-head'>
                                <TableRow>
                                   {["Coins", "Price", "24h Change", "Market Cap"].map((tableHead) => (
                                    
                                     <TableCell className='table-cell'
                                       key={tableHead}
                                       align= "right"
                                       //   align="center"
                                     >
                                        {tableHead}

                                     </TableCell>
                                 
                                 ))}
                                 </TableRow>
                               </TableHead>

                                  <TableBody>
                             {/* this handlesearch return all of the filtered coins */}
                                      { coins.slice((page-1)*10, (page-1)* 10 + 10)  // FOR ONLY SHOW 10 COMPONENTS IN 1 PAGE
                                           .map((row) =>{
                                             let profit = row.price_change_percentage_24h > 0;

                                            return(
                                               <TableRow onClick={() => navigate(`/coins/${row.id}`)}
                                                key={row.name}
                                                className="table-row"
                                               >

                                               <TableCell 
                                                component="th" 
                                                scope="row"
                                                style={{ display: "flex", gap:15 }}
                                                >

                                                  <img
                                                     src={row?.image}
                                                     alt={row.name}
                                                     height="50" 
                                                    />    

                                                    <div className='coin-detail'>
                                                     <span className='coin-symbol'>{row.symbol}</span>   
                                                     <span style={{ color: "darkgrey"}}>{row.name}</span>             
                                                    </div>               
                                               
                                               </TableCell>

                                                <TableCell align='right' style={{ fontWeight:400, fontSize: 17}}>

                                                   {symbol} {numberWithCommas(row?.current_price.toFixed(2))}
                                                                   
                                                </TableCell>

                                                 <TableCell align='right'
                                                    style={{ color: profit > 0 ? "rgba(14,203,129)" : "red", 
                                                    fontWeight:400, 
                                                    fontSize: 17
                                                   }}
                                                 >
                                                     { profit && "+" } 
                                                      {row?.price_change_percentage_24h?.toFixed(2)}% 
                                             
                                                </TableCell>

                                                 <TableCell className='market-cap' align='right'>
                                                 {symbol}{" "}
                                                   {numberWithCommas(
                                                      row.market_cap.toString().slice(0,-6)
                                                   )} M

                                                 </TableCell>

                                              </TableRow>
                                            )
                                      })}
                                  </TableBody>

                           </Table>
                        )
                      }
            </TableContainer>

            <Pagination
            // count={(coins.length/10).toFixed(0)}  // DONT WANT IN DECIMAL SO WE USE toFixed(0)
            className="pagination"
            color="primary"
            onChange={(_, value) => { setPage(value); }}

            />

        </Container>
     </ThemeProvider>
     </>
  )
}

export default CoinsTable;
