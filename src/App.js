import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Exchanges from './components/Exchanges'
import Coins from './components/Coins'
import CoinsTest from './components/CoinsTest'
import CoinDetails from './components/CoinDetails'

import "./styles/App.scss"
// import Footer from './components/Footer'



const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/coins' element={<Coins />} />
          <Route path='/coinstest' element={<CoinsTest />} />
          <Route path='/exchanges' element={<Exchanges />} />
          <Route path='/coin/:id' element={<CoinDetails />} />
          <Route path='*' element={"Error"} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  )
}

export default App
