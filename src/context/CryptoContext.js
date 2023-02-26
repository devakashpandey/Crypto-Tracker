import React, { createContext, useContext, useEffect, useState } from 'react'

const CryptoContext = createContext();

const ContextProvider = ({children}) => {

   const [currency, setCurrency] = useState("INR") // for default currency
   const [symbol , setSymbol] = useState("₹")  // changing the symbol/currency after selecting the option
 

   useEffect(() => {
      if(currency === "INR") setSymbol("₹")
      else if (currency === "USD") setSymbol("$")
   }, [currency])

     return(
         <CryptoContext.Provider value={{ currency, symbol, setCurrency }}>
              {children}
         </CryptoContext.Provider> 
     ) 

}

export default ContextProvider;

export const UseCryptoValue = () => useContext(CryptoContext)
                      