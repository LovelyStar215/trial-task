import { useState } from 'react';
import Image from 'next/image'

import clock from '@/public/widgets/Analog Clock.png';
import cryptoPriceTicker from '@/public/widgets/Crypto Price Ticker.png';
import cryptoStockChart from '@/public/widgets/Crypto StockChart.png';
import embed from '@/public/widgets/Embed Widget.png';
import quotes from '@/public/widgets/Quotes.png';
import RSSnews from '@/public/widgets/RSSnews.png';
import cryptoPortfolio from '@/public/widgets/Crypto Portfolio.png';
interface WidgetSelectorProps {
  selectedWidget: number;
  onWidgetSelect: (widgetId: number) => void;
  onWidgetDeselect: (widgetId: number) => void;
}

const WidgetSelector: React.FC<WidgetSelectorProps> = ({ selectedWidget, onWidgetSelect, onWidgetDeselect }) => {
  const [widgets] = useState([
    clock,
    embed,
    quotes,
    RSSnews,
    cryptoStockChart,
    cryptoPriceTicker,
    cryptoPortfolio
  ]);
  const widgetName = ["Analog Clock", "Embed Page", "Quotes", "RSS News", "Stockchart", "Price Ticker", "Portfolio"]
  const handleWidgetClick = (widgetId: number) => {
    console.log(widgetId, selectedWidget);
    if (selectedWidget == widgetId) {
      onWidgetDeselect(widgetId);
    } else {
      console.log("selected: ", widgetId);
      onWidgetSelect(widgetId);
    }
  };

  return (
    <div>
      <div className='my-2 grid grid-cols-3'>
        {widgets.map((widget, index) => (
          <div className='m-2'>
            <div className={`cursor-pointer border ${selectedWidget == index ? "border-green-600" : "border-gray-300"} rounded-lg w-full items-center justify-center`} key={index} onClick={() => handleWidgetClick(index)}>
              <div className='p-1'>
                <Image className='w-full h-full' src={widget} alt="Widget Image" />
              </div>
              <p className={`px-2 py-1  ${selectedWidget == index ? "bg-green-600" : "bg-gray-300"} w-full text-xs rounded-b-lg text-center`}>{widgetName[index]}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetSelector;
