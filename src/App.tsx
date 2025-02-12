import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const NEWS_API_URL = "https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=d86768e3ee474182b57b876a39a42947";
const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=elys-network,plume,blast,notcoin,movement,mantra-dao&vs_currencies=usd";

type NewsArticle = {
    title: string;
    url: string;
    description: string;
    urlToImage?: string;
};

type PricesType = {
    "elys-network": { usd: number } | null;
    plume: { usd: number } | null;
    blast: { usd: number } | null;
    notcoin: { usd: number } | null;
    movement: { usd: number } | null;
    "mantra-dao": { usd: number } | null;
};

function CryptoDashboard() {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [prices, setPrices] = useState<PricesType>({
        "elys-network": null,
        plume: null,
        blast: null,
        notcoin: null,
        movement: null,
        "mantra-dao": null
    });

    const fetchNews = useCallback(async () => {
        try {
            const response = await axios.get(NEWS_API_URL);
            setNews(response.data.articles.slice(0, 10));
        } catch (error) {
            console.error("Ошибка при получении новостей:", error);
        }
    }, []);

    const fetchPrices = useCallback(async () => {
        try {
            const response = await axios.get(API_URL);
            setPrices(response.data);
        } catch (error) {
            console.error("Ошибка при получении цены криптовалют:", error);
        }
    }, []);

    useEffect(() => {
        fetchNews();
        fetchPrices();
    }, [fetchNews, fetchPrices]);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col w-screen">
            <header className="bg-gray-800 p-4 text-center text-2xl font-bold text-green-400">
                Crypto News Hub
            </header>
            <main className="flex-1 max-w-4xl mx-auto p-6">
                <h2 className="text-xl font-bold text-green-400 mb-6">Cryptocurrency Prices</h2>
                <ul className="space-y-4">
                    <li className="p-4 bg-gray-800 rounded-xl flex justify-between items-center shadow-md">
                        <span className="font-semibold">ELYS-NETWORK:</span> <span className="text-green-300">{prices["elys-network"]?.usd ?? "Loading..."} USD</span>
                    </li>
                    <li className="p-4 bg-gray-800 rounded-xl flex justify-between items-center shadow-md">
                        <span className="font-semibold">PLUME:</span> <span className="text-blue-300">{prices.plume?.usd ?? "Loading..."} USD</span>
                    </li>
                    <li className="p-4 bg-gray-800 rounded-xl flex justify-between items-center shadow-md">
                        <span className="font-semibold">BLAST:</span> <span className="text-red-300">{prices.blast?.usd ?? "Loading..."} USD</span>
                    </li>
                    <li className="p-4 bg-gray-800 rounded-xl flex justify-between items-center shadow-md">
                        <span className="font-semibold">NOTCOIN:</span> <span className="text-yellow-300">{prices.notcoin?.usd ?? "Loading..."} USD</span>
                    </li>
                    <li className="p-4 bg-gray-800 rounded-xl flex justify-between items-center shadow-md">
                        <span className="font-semibold">MOVEMENT:</span> <span className="text-purple-300">{prices.movement?.usd ?? "Loading..."} USD</span>
                    </li>
                    <li className="p-4 bg-gray-800 rounded-xl flex justify-between items-center shadow-md">
                        <span className="font-semibold">MANTRA:</span> <span className="text-pink-300">{prices["mantra-dao"]?.usd ?? "Loading..."} USD</span>
                    </li>
                </ul>
                
                <h2 className="text-xl font-bold text-green-400 mt-8 mb-6">Latest Crypto News</h2>
                <div className="space-y-6">
                    {news.map((article, index) => (
                        <div key={index} className="p-4 bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center">
                            {article.urlToImage && (
                                <img src={article.urlToImage} alt={article.title} className="w-32 h-32 object-cover rounded-lg md:mr-4" />
                            )}
                            <div>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-lg font-semibold">
                                    {article.title}
                                </a>
                                <p className="text-gray-400 text-sm mt-2">{article.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="bg-gray-800 p-4 text-center text-gray-400 mt-6">
                © {new Date().getFullYear()} Crypto News Hub - Все права защищены
            </footer>
        </div>
    );
}

export default CryptoDashboard;