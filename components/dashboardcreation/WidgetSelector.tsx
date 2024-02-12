// components/WidgetSelector.tsx

import { useState } from 'react';

interface WidgetSelectorProps {
  selectedWidget: number;
  onWidgetSelect: (widgetId: number) => void;
  onWidgetDeselect: (widgetId: number) => void;
}

const WidgetSelector: React.FC<WidgetSelectorProps> = ({ selectedWidget, onWidgetSelect, onWidgetDeselect }) => {
  const [widgets] = useState<string[]>([
    'None',
    'Widget 1',
    'Widget 2',
    'Widget 3',
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
      <ul className='my-2'>
        {widgets.map((widgetName, index) => (
          <li
            key={index}
            onClick={() => handleWidgetClick(index)}
            style={{ cursor: 'pointer', color: selectedWidget == index ? 'blue' : 'black' }}
          >
            {widgetName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSelector;
