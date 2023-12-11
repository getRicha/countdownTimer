import React, { useState, useEffect } from 'react';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import { LuTimerReset } from "react-icons/lu";

const CountdownTimer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  useEffect(() => {
    let countdownInterval;

    if (isActive && totalSeconds > 0) {
      countdownInterval = setInterval(() => {
        setTotalSeconds(totalSeconds => totalSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [isActive, totalSeconds]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTotalSeconds(0);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    // Parse the input value to total seconds
    const parsedValue = parseInt(newValue, 10);
    setTotalSeconds(isNaN(parsedValue) ? 0 : parsedValue * 60);

    setIsActive(false);
  };

  return (
    <div className='timerContainer'>
      <div className='inputField'>
        <label htmlFor="inputTime">Enter minutes:</label>
        <input
          type="number"
          id="inputTime"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className='timerIcons'>
        <button onClick={handleReset}><LuTimerReset /></button>
        <button onClick={handlePause} disabled={!isActive}><FaPauseCircle /></button>
        <button onClick={handleStart} disabled={isActive}><FaPlayCircle /></button>
        <span><b>
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </b></span>
      </div>
    </div>
  );
};

export default CountdownTimer;
