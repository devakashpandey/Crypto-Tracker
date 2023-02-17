import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';

function App() {
  return (
    <>
    <div className='main-div'>
     <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/coins/:id" element={<CoinPage/>} />
      </Routes>
    </div>
    </>
  );
}

export default App;
