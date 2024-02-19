import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

interface EditStockchartWidgetProps {
  onChangeSymbol: (symbol: string) => void;
}

const EditStockchartWidget: React.FC<EditStockchartWidgetProps> = ({ onChangeSymbol }) => {

  const [symbol, setSymbol] = useState<string>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSymbol = e.target.value;
    onChangeSymbol(newSymbol);
    setSymbol(newSymbol);
  };

  return (
    <Input type="text" placeholder="Input New Symbol" onChange={handleChange} value={symbol} />
  );
};

export default EditStockchartWidget;
