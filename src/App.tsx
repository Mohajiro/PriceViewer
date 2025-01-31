import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=elys-network,plume,blast,notcoin,movement,mantra-dao&vs_currencies=usd";

function App() {
    const [prices, setPrices] = useState({ "elys-network": null, plume: null, blast: null, notcoin: null, movement: null, "mantra-dao": null });
    const [history, setHistory] = useState([]);

    // Функция для получения цены криптовалют
    const fetchPrices = async () => {
        try {
            const response = await axios.get(COINGECKO_API_URL);
            setPrices(response.data);
            setHistory(prev => [...prev.slice(-9), { time: new Date().toLocaleTimeString(), ...response.data }]);
        } catch (error) {
            console.error("Ошибка при получении цены криптовалют:", error);
        }
    };

    useEffect(() => {
        fetchPrices();
        const interval = setInterval(fetchPrices, 600000); // Обновляем каждые 10 минут
        return () => clearInterval(interval);
    }, []);

    const data = {
        labels: history.map(entry => entry.time),
        datasets: [
            { label: "ELYS-NETWORK (USD)", data: history.map(entry => entry["elys-network"]?.usd), borderColor: "#ff4500", fill: false },
            { label: "PLUME (USD)", data: history.map(entry => entry.plume?.usd), borderColor: "#8a2be2", fill: false },
            { label: "BLAST (USD)", data: history.map(entry => entry.blast?.usd), borderColor: "#ff1493", fill: false },
            { label: "NOTCOIN (USD)", data: history.map(entry => entry.notcoin?.usd), borderColor: "#32cd32", fill: false },
            { label: "MOVEMENT (USD)", data: history.map(entry => entry.movement?.usd), borderColor: "#ff8c00", fill: false },
            { label: "MANTRA (USD)", data: history.map(entry => entry["mantra-dao"]?.usd), borderColor: "#1e90ff", fill: false }
        ]
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white w-screen">
            <div className="w-full max-w-6xl p-8 bg-gray-800 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-green-400 mb-6">Crypto Dashboard</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-lg">
                    <p><strong>ELYS-NETWORK:</strong> {prices["elys-network"]?.usd} USD</p>
                    <p><strong>PLUME:</strong> {prices.plume?.usd} USD</p>
                    <p><strong>BLAST:</strong> {prices.blast?.usd} USD</p>
                    <p><strong>NOTCOIN:</strong> {prices.notcoin?.usd} USD</p>
                    <p><strong>MOVEMENT:</strong> {prices.movement?.usd} USD</p>
                    <p><strong>MANTRA:</strong> {prices["mantra-dao"]?.usd} USD</p>
                </div>
                <div className="w-full mt-8">
                    <Line data={data} />
                </div>
                <footer className="mt-8 text-sm">
                    <p>Developed by <a href="https://github.com/Mohajiro/" target="_blank" className="text-green-400 hover:underline">Mohajiro</a></p>
                </footer>
            </div>
        </div>
    );
}

export default App;
