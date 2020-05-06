import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [timer, setTimer] = useState({
    name: 'initial timer',
    time: 0,
    active: true,
  });

  useEffect(() => {
    const handleTimerChange = setTimeout(() => {
      setTimer({ ...timer, time: timer.time + 1 });
    }, 1000);
  }, [timer]);

  // Only re-run the effect if timerType changes
  return <div>{timer.time}</div>;
}

export default App;
