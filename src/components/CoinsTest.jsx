import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from './Loader';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const PAGE_NUMBER = 1;
const Coins = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState("inr");
    const [page, setPage] = useState(PAGE_NUMBER);
    
    const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    

    useEffect(() => {
        setTimeout(async () => {
            const apiLink = `https://api.coingecko.com/api/v3`

            const {data} = await axios.get(
                `${apiLink}/coins/markets?vs_currency=${currency}&page=${page}&per_page=12&sparkline=false`
            );

            setCoins((prev) => {
                return [...prev, ...data];
            });
            setLoading(false);
        }, 1500);
    }, [page, currency]);

 
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = async () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            setLoading(true);
            setPage((prev) => prev + 1);
        }
    };

    const handleChange = e => {
        setCurrency(e.target.value)
    }

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <div className="selectCurrency">
                        <label className="currency-radiobtn" htmlFor="inr">
                            <input type="radio" name="currency" value="inr" checked={currency === "inr"} onChange={handleChange} />
                            INR
                        </label>
                        <label className="currency-radiobtn" htmlFor="usd">
                            <input type="radio" name="currency" value="usd" checked={currency === "usd"} onChange={handleChange} />
                            USD
                        </label>
                        <label className="currency-radiobtn" htmlFor="eur">
                            <input type="radio" name="currency" value="eur" checked={currency === "eur"} onChange={handleChange} />
                            EUR
                        </label>
                    </div>
                    <div className='container'>
                        {coins.map((coin) => (
                            <Link to={`/coin/${coin.id}`} key={coin.id}>
                                <div className="coin">
                                    <img src={coin.image} alt={coin.name} />
                                    <h1>{coin.symbol}</h1>
                                    <h4>{coin.name}</h4>
                                    <p>{currencySymbol + coin.current_price}</p>
                                </div>
                            </Link>
                        ))}
                        {loading && <Loader />}
                    </div>
                    <Footer />
                </>
            }
        </>
    );
}

export default Coins;
