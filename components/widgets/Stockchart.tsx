// import React from 'react';
// import sanitizeHtml from 'sanitize-html';
// import { MiniChart, SymbolOverview } from 'react-tradingview-embed';
// import { useState } from 'react';

// interface StockChartProps {
//     symbol: string;
// }

// const StockChart = () => {
//     // Sanitize the URL
//     const [currentSymbol, setCurrentSymbol] = useState("USD");

//     return (
//         // <SymbolOverview
//         //     key={"1"}
//         //     widgetProps={{
//         //         width: "100%",
//         //         height: "252px",
//         //         symbols: [currentSymbol],
//         //     }}
//         // />
//         <MiniChart
//             key="1"
//             widgetProps={{
//                 width: "100%",
//                 height: 252,
//                 symbol: currentSymbol
//             }}
//         />

//     );
// };

// export default StockChart;
"use client"

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

interface StockChartProps {
  symbol: string;
}
const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: `${symbol} Price`,
        data: [],
        fill: false,
        borderColor: 'rgb(255, 0, 0)',
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=20&interval=daily`);
        console.log(response);
        const data = response.data.prices;
        const labels = data.map((item: any) => new Date(item[0]).toLocaleDateString());
        const prices = data.map((item: any) => item[1]);
        setChartData({
          ...chartData,
          labels,
          datasets: [
            {
              ...chartData.datasets[0],
              label: `${symbol} Price`,
              data: prices,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [symbol]);

  return (
    <div className="rounded-lg shadow-lg pt-3 pb-2">
      <h2 className="text-xl font-bold mb-4">Stock Chart</h2>
      <div className="w-full h-48 flex items-center justify-center">
        <Line
          data={chartData}
          color='#ff0000'
          options={{
            scales: {
              x: {
                type: 'category', // Use 'category' scale for the x-axis
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default StockChart;
