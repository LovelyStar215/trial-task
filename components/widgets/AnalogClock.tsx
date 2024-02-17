import "react-clock/dist/Clock.css";
import React, { useState, useEffect } from 'react';
import Clock from 'react-clock';
import moment from 'moment-timezone';

const AnalogClock = () => {
  const [selectedTimeZone, setSelectedTimeZone] = useState('UTC');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const timeZones = moment.tz.names();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment.tz(selectedTimeZone).toDate());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [selectedTimeZone]);


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeZone(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
        <select
          className="border rounded p-2 w-3/4 m-3"
          onChange={handleChange}
        >
          {timeZones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
        <Clock
          renderNumbers={true}
          renderMinuteMarks={true}
          value={currentTime}
        />
    </div>
  );
};

export default AnalogClock;
