import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  setTable: Dispatch<SetStateAction<string>>;
  table: string;
}

export const Header = ({ setTable, table }: HeaderProps) => {
  const handleClick = (table: string) => {
    setTable(table);
    localStorage.setItem("table", table);
  };
  return (
    <header className="flex justify-center mb-2 mt-1">
      <div className="flex gap-0.5 justify-center bg-blue-900 p-1 rounded text-xs">
        <button
          className={`py-1 px-2 rounded ${
            table === "top" ? "bg-white shadow-sm" : "bg-transparent text-white"
          }`}
          onClick={() => handleClick("top")}
        >
          Top 100
        </button>
        <button
          className={`py-1 px-2 rounded ${
            table === "watchlist"
              ? "bg-white shadow-sm"
              : "bg-transparent text-white"
          }`}
          onClick={() => handleClick("watchlist")}
        >
          Watchlist
        </button>
      </div>
    </header>
  );
};
