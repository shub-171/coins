import React, { useEffect, useState } from 'react'
import axios from "axios"
import Loader from './Loader';


const Exchanges = () => {

    const [exchange, setExchange] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExchanges = async () => {
           try{
            const apiLink = `https://api.coingecko.com/api/v3`
            const { data } = await axios.get(`${apiLink}/exchanges?per_page=20`);
            setExchange(data);
            setLoading(false);
            console.log(data);
           }
           catch(error){
            alert("Couldn't able to fetch data!")
           }
        };
        fetchExchanges();
    }, []);

  return (
    <div className="container">
                {loading ? <Loader /> :  
                    exchange && exchange.map((i) => (
                        <div className="coin" key={i.id}>
                        <img src={i.image} alt="" />
                        <h1>{i.trust_score_rank}</h1>
                        <p>{i.name}</p>
                    </div>
                ))
                    }
            </div>
  )
}

export default Exchanges
