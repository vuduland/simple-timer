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
      const minutess = Math.floor((this.elapsed() / 60000) % 60);
      console.log(`Minutes: ${minutess}`);
      return minutess;
      // Math.floor((this.elapsed() / 60000) % 60);
    },
    seconds() {
      const secondss = Math.floor((this.elapsed() / 1000) % 60);
      console.log(`Seconds: ${secondss}`);
      return secondss;
      // return Math.floor((this.elapsed() / 1000) % 60);
    },
    miliseconds() {
      const milliseconds = Math.floor(this.elapsed() % 60);
      console.log(`Milliseconds: ${milliseconds}`);
      return milliseconds;
      // return Math.floor(this.elapsed() % 60);
    },
    difference() {
      const diff = this.current - this.start;
      console.log(`Difference: ${diff}`);
      return diff;
      // return this.current - this.start;
    },
    elapsed() {
      const elapsed = this.time - (this.current - this.start);
      console.log(`Elapsed: ${elapsed}`);
      return elapsed;
      // return this.time - (this.current - this.start);
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
          <div className='top'>
            <span>Time:</span>
            <span className='time'>
              {timer.minutes()}:{timer.seconds().toFixed(0)}:{timer.miliseconds().toFixed(0)}
            </span>
          </div>
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
// "We made a timer an hour ago. But this timer is far superior. -- Marc Farias Jones"

export default App;
