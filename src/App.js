import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [timer, setTimer] = useState({
    name: 'initial timer',
    time: 600000, // 6
    start: 0,
    current: 0,
    end: 0,
    total: 0,

    minutes() {
      return Math.floor((this.elapsed() / 60000) % 60);
    },
    seconds() {
      return Math.floor((this.elapsed() / 1000) % 60);
    },
    difference() {
      return this.current - this.start;
    },
    elapsed() {
      // const totally =
      // this.time -= (this.current - this.start)
      return this.time - (this.current - this.start);
    },
  });
  const [timerActive, setTimerActive] = useState('stopped');

  let handleTimerChange = null;

  useEffect(() => {
    if (timerActive === 'starting') {
      setTimer({
        ...timer,
        total: timer.total + timer.difference(),
        start: Date.now() - timer.difference(),
      });
      setTimerActive('active');
    }
    handleTimerChange = setTimeout(() => {
      if (timerActive === 'active') {
        setTimer({ ...timer, current: Date.now() }); // Date.now() === miliseconds?
      }
    }, 1);
    if (timerActive === 'stopped') {
      clearTimeout(handleTimerChange);
    }
  }, [timer, timerActive]);

  // Only re-run the effect if timerType changes
  return (
    <div>
      <div className='container'>
        <div className='timerblock'>
          <span>Time:</span>
          <span>
            {timer.total}
            <br></br>
            {timer.minutes()}:{timer.seconds().toFixed(0)}
            <br></br>
            {timer.elapsed().toFixed(0)}
          </span>
          <div className='bottom'>
            <button
              onClick={() => setTimerActive(timerActive === 'active' ? 'stopped' : 'starting')}>
              {timerActive === 'active' ? `stop` : `start`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// :{timer.miliseconds().toFixed(0)}
console.log(`Date.now() === ${Date.now()}`);

export default App;
