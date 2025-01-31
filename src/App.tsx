import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=elys-network,plume,blast,notcoin,movement,mantra-dao&vs_currencies=usd";

type PricesType = {
    "elys-network": { usd: number } | null;
    plume: { usd: number } | null;
    blast: { usd: number } | null;
    notcoin: { usd: number } | null;
    movement: { usd: number } | null;
    "mantra-dao": { usd: number } | null;
};

function CryptoPrices() {
    const [prices, setPrices] = useState<PricesType>({
        "elys-network": null,
        plume: null,
        blast: null,
        notcoin: null,
        movement: null,
        "mantra-dao": null
    });
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const fetchPrices = useCallback(async () => {
        try {
            const response = await axios.get(API_URL);
            const formattedData: PricesType = {
                "elys-network": response.data["elys-network"] ?? null,
                plume: response.data.plume ?? null,
                blast: response.data.blast ?? null,
                notcoin: response.data.notcoin ?? null,
                movement: response.data.movement ?? null,
                "mantra-dao": response.data["mantra-dao"] ?? null
            };
            setPrices(formattedData);
        } catch (error) {
            console.error("Ошибка при получении цены криптовалют:", error);
        }
    }, []);

    useEffect(() => {
        fetchPrices();
        
        if (!intervalRef.current) {
            intervalRef.current = setInterval(fetchPrices, 60000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [fetchPrices]);

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