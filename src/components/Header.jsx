import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <nav>
        <h1>Coins</h1>
        <main>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/coins">Coins</Link>
        </main>
      </nav>
    </>
  )
}

export default Header
