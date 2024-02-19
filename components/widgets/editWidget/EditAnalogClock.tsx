import React from 'react';
import moment from 'moment-timezone';

interface EditAnalogClockProps {
  onSelectTimezone: (timeZone: string) => void;
}

const EditAnalogClock: React.FC<EditAnalogClockProps> = ({ onSelectTimezone }) => {
  const timeZones = moment.tz.names();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectTimezone(e.target.value);
  };

  return (
    <select
      className="border rounded p-2"
      onChange={handleChange}
    >
      {timeZones.map((tz) => (
        <option key={tz} value={tz}>
          {tz}
        </option>
      ))}
    </select>
  );
};

export default EditAnalogClock;
