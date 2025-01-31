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
        <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-green-400 mb-4 text-center">Crypto Prices</h3>
            <ul className="space-y-2">
                <li className="p-3 bg-gray-800 rounded-lg flex justify-between">
                    <span className="font-semibold">ELYS-NETWORK:</span> <span>{prices["elys-network"]?.usd ?? "Loading..."} USD</span>
                </li>
                <li className="p-3 bg-gray-800 rounded-lg flex justify-between">
                    <span className="font-semibold">PLUME:</span> <span>{prices.plume?.usd ?? "Loading..."} USD</span>
                </li>
                <li className="p-3 bg-gray-800 rounded-lg flex justify-between">
                    <span className="font-semibold">BLAST:</span> <span>{prices.blast?.usd ?? "Loading..."} USD</span>
                </li>
                <li className="p-3 bg-gray-800 rounded-lg flex justify-between">
                    <span className="font-semibold">NOTCOIN:</span> <span>{prices.notcoin?.usd ?? "Loading..."} USD</span>
                </li>
                <li className="p-3 bg-gray-800 rounded-lg flex justify-between">
                    <span className="font-semibold">MOVEMENT:</span> <span>{prices.movement?.usd ?? "Loading..."} USD</span>
                </li>
                <li className="p-3 bg-gray-800 rounded-lg flex justify-between">
                    <span className="font-semibold">MANTRA:</span> <span>{prices["mantra-dao"]?.usd ?? "Loading..."} USD</span>
                </li>
            </ul>
        </div>
    );
}

export default CryptoPrices;