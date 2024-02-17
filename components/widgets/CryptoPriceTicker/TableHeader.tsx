export const TableHeader = () => {
  return (
    <ul className="grid grid-cols-3 place-items-center bg-blue-900 text-white border p-1 rounded-t text-xs">
      <li className="flex w-full">
        <span className="hidden sm:block">Rank</span>
        <span className="w-full ">Coin</span>
      </li>
      <li>Price</li>
      <li>Change {"(24h)"}</li>
    </ul>
  );
};
