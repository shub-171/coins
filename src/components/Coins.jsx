import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from './Loader';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const Coins = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currency, setCurrency] = useState("inr");
    const [page, setPage] = useState(1);

    const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const apiLink = `https://api.coingecko.com/api/v3`
                const { data } = await axios.get(`${apiLink}/coins/markets?vs_currency=${currency}&page=${page}&per_page=20`);
                setCoins(data);
                setLoading(false);
                console.log(data);
            }
            catch (error) {
                alert("Couldn't able to fetch data!")
            }
        };
        fetchCoins();
    }, [currency, page]);


    const handleChange = e => {
        setCurrency(e.target.value)
    }

    const changePage =()=>{
        console.log("page change")
        setPage(page + 1)
    }

    const hasMore=()=>{
        if(coins.length > 0){
            return true;
        }
        else{
            return false;
        }
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
                    <div>
                        <InfiniteScroll 
                            dataLength={coins.length}
                            next={changePage}
                            hasMore={hasMore}
                            // loader={<Loader />}
                            className="container"
                        >
                        {
                            coins.map((i) => (
                                <Link to={`/coin/${i.id}`}>
                                <div className="coin" key={i.id}>
                                    <img src={i.image} alt={i.name} />
                                    <h1>{i.symbol}</h1>
                                    <h4>{i.name}</h4>
                                    <p>{currencySymbol + i.current_price}</p>
                                </div>
                                </Link>
                            ))
                        }
                        </InfiniteScroll>
                    </div>
                </>
            }
        </>
    )
}

export default Coins
