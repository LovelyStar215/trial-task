// components/WidgetSelector.tsx

import { useState } from 'react';

interface WidgetSelectorProps {
  selectedWidget: string;
  onWidgetSelect: (widgetId: string) => void;
  onWidgetDeselect: (widgetId: string) => void;
}

const WidgetSelector: React.FC<WidgetSelectorProps> = ({ selectedWidget, onWidgetSelect, onWidgetDeselect }) => {
  const [widgets] = useState<string[]>([
    'None',
    'Widget 1',
    'Widget 2',
    'Widget 3',
    // Add more widget options as needed
  ]);

  const handleWidgetClick = (widgetId: string) => {
    if (selectedWidget.includes(widgetId)) {
      onWidgetDeselect(widgetId);
    } else {
      onWidgetSelect(widgetId);
    }
  };

  return (
    <div>
      <span className='text-lg font-bold'>Widget Selector</span>
      <ul className='my-2'>
        {widgets.map(widgetId => (
          <li
            key={widgetId}
            onClick={() => handleWidgetClick(widgetId)}
            style={{ cursor: 'pointer', color: selectedWidget.includes(widgetId) ? 'blue' : 'black' }}
          >
            {widgetId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSelector;
