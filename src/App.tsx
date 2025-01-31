import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=elys-network,plume,blast,notcoin,movement,mantra-dao&vs_currencies=usd";

function CryptoPrices() {
    const [prices, setPrices] = useState({});

    const fetchPrices = async () => {
        try {
            const response = await axios.get(API_URL);
            setPrices(response.data);
        } catch (error) {
            console.error("Ошибка при получении цены криптовалют:", error);
        }
    };

    useEffect(() => {
        fetchPrices(); 

        const interval = setInterval(fetchPrices, 60000); 
        return () => clearInterval(interval); 
    }, []);

    return (
        <div>
            <h3>Crypto Prices</h3>
            <ul>
                <li><strong>ELYS-NETWORK:</strong> {prices["elys-network"]?.usd ?? "Loading..."} USD</li>
                <li><strong>PLUME:</strong> {prices.plume?.usd ?? "Loading..."} USD</li>
                <li><strong>BLAST:</strong> {prices.blast?.usd ?? "Loading..."} USD</li>
                <li><strong>NOTCOIN:</strong> {prices.notcoin?.usd ?? "Loading..."} USD</li>
                <li><strong>MOVEMENT:</strong> {prices.movement?.usd ?? "Loading..."} USD</li>
                <li><strong>MANTRA:</strong> {prices["mantra-dao"]?.usd ?? "Loading..."} USD</li>
            </ul>
        </div>
    );
}

export default CryptoPrices;
