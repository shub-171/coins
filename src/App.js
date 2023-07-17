import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Exchanges from './components/Exchanges'
import Coins from './components/Coins'
import CoinDetails from './components/CoinDetails'

import "./styles/App.scss"



const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/coins' element={<Coins />} />
          <Route path='/exchanges' element={<Exchanges />} />
          <Route path='/coin/:id' element={<CoinDetails />} />
          <Route path='*' element={"Error"} />
        </Routes>
      </Router>
    </>
  )
}

export default App
