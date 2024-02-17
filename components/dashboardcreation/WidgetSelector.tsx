import { useState } from 'react';
import Image from 'next/image'

import clock from '@/public/widgets/Analog Clock.png';
import cryptoPriceTicker from '@/public/widgets/Crypto Price Ticker.png';
import cryptoStockChart from '@/public/widgets/Crypto StockChart.png';
import embed from '@/public/widgets/Embed Widget.png';
import quotes from '@/public/widgets/Quotes.png';
import RSSnews from '@/public/widgets/RSSnews.png';
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
  ]);
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
          <div className={`cursor-pointer m-2 border ${ selectedWidget == index ? "border-green-600": "border-gray-300" } rounded-lg p-1`} key={index} onClick={() => handleWidgetClick(index)}>
            <Image className='w-full h-full' src={widget} alt="Widget Image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetSelector;
