import React, { useEffect, useState, useCallback } from 'react';
import axios from "axios";
import Loader from './Loader';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Coins = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currency, setCurrency] = useState("inr");
    const [page, setPage] = useState(1);
    const [loadedPages, setLoadedPages] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const handleScroll = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
            if (hasMore && !loading) {
                setLoading(true);
                setPage(prevPage => prevPage + 1);
            }
        }
    }, [hasMore, loading]);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                if (!loadedPages.includes(page)) {
                    const apiLink = `https://api.coingecko.com/api/v3`
                    const { data } = await axios.get(`${apiLink}/coins/markets?vs_currency=${currency}&page=${page}&per_page=20`);
                    if (data.length === 0) {
                        setHasMore(false);
                    } else {
                        setCoins(prevCoins => [...prevCoins, ...data]);
                        setLoading(false);
                    }
                    setLoadedPages(prevLoadedPages => [...prevLoadedPages, page]);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                alert("Couldn't able to fetch data!");
            }
        };
        fetchCoins();
    }, [currency, page, loadedPages]); 

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

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
