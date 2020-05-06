import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [timer, setTimer] = useState({
    name: 'initial timer',
    time: 120,
    minutes() {
      return Math.floor(this.time / 60);
    },
    seconds() {
      return this.time % 60; //<= 60 ? this.time : 60
    },
    active: true,
  });

  useEffect(() => {
    const handleTimerChange = setTimeout(() => {
      setTimer({ ...timer, time: timer.time - 1 });
    }, 1000);
  }, [timer]);

  // Only re-run the effect if timerType changes
  return (
    <div>
      <div className='block'>
        <span>Minutes:</span>
        <span>
          {timer.minutes()}:{timer.seconds().toFixed(0)}
        </span>
      </div>
      {timer.time}
    </div>
  );
}

export default App;
