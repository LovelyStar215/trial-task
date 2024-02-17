import { Coin } from "./types";

interface RowProps {
  coin: Coin;
}

export const Row = ({ coin }: RowProps) => {
  const formatPrice = (price: number): string => {
    let formattedPrice;
    const arr = price.toString().split(".");
    if (arr.length > 1)
      formattedPrice = `${Number(arr[0]).toLocaleString()}.${arr[1]}`;
    else formattedPrice = Number(arr[0]).toLocaleString();

    return formattedPrice;
  };

  return (
    <li className="grid grid-cols-3 place-items-center p-1 border-b hover:bg-gray-100 text-xs relative group">
      <div className="flex w-full gap-8 items-center">
        <span className="w-8 text-center text-sm font-semibold hidden sm:block">
          {coin.market_cap_rank}
        </span>
        <div className="w-full flex gap-3 items-center">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-3 object-contain"
          />
          <span className="uppercase font-semibold">{coin.symbol}</span>
        </div>
      </div>
      <div className="font-semibold">${formatPrice(coin.current_price)}</div>
      <div
        className={`font-semibold ${
          coin.price_change_percentage_24h >= 0
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {coin.price_change_percentage_24h > 0 && "+"}
        {coin.price_change_percentage_24h.toFixed(2)}% 
      </div>
    </li>
  );
};
