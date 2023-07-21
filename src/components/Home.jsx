import React from 'react'
import btc from '../assets/btc.png'
import Footer from './Footer'

const Home = () => {

    return (
        <>
            <div className='homeContainer'>
                <img src={btc} alt="Bitcoin" />
                <h1>Crypto</h1>
            </div>
            <Footer />
        </>
    )
}

export default Home
