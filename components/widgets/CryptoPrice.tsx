import { Header } from "./CryptoPriceTicker/Header";
import { useState } from "react";
import { TableHeader } from "./CryptoPriceTicker/TableHeader";
import { TopCoins } from "./CryptoPriceTicker/TopCoins";
import { Watchlist } from "./CryptoPriceTicker/Watchlist";

const CryptoPrice = () => {
    const [table, setTable] = useState(localStorage.getItem("table") || "top");

    const [watchlist, setWatchlist] = useState(
        JSON.parse(localStorage.getItem("watchlist") || "[]")
    );

    return (
        <div className="bg-gray-50 rounded overflow-hidden flex flex-col h-[252px]">
            <main className="overflow-hidden flex flex-col">
                <TableHeader />
                <TopCoins />
            </main>
        </div>
    );
}

export default CryptoPrice;
