import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { Theme } from '../types';

interface TimerProps {
  theme: Theme;
}

const Timer: React.FC<TimerProps> = ({ theme }) => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState('25');

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const reset = useCallback(() => {
    setTime(parseInt(customTime) * 60);
    setIsRunning(false);
  }, [customTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const getBgColor = () => {
    switch (theme) {
      case 'light':
        return 'bg-lime-600';
      case 'yellow':
        return 'bg-yellow-50';
      case 'dark':
        return 'bg-gray-800';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className={`${getBgColor()} p-6 rounded-xl shadow-lg animate-slideIn`}>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Focus Timer</h2>
      </div>
      
      <div className="text-center space-y-4">
        <div className="text-4xl font-mono font-bold">{formatTime(time)}</div>
        
        <div className="flex items-center gap-2 justify-center">
          <input
            type="number"
            value={customTime}
            onChange={(e) => {
              const value = e.target.value;
              setCustomTime(value);
              if (!isRunning) {
                setTime(parseInt(value) * 60);
              }
            }}
            className={`w-20 px-2 py-1 rounded-lg text-center ${
              theme === 'dark' 
                ? 'bg-gray-700' 
                : 'bg-opacity-20 backdrop-blur-md'
            }`}
            min="1"
            max="60"
          />
          <span className="text-sm">minutes</span>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-2 rounded-full hover:bg-opacity-20 backdrop-blur-md transition-all"
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={reset}
            className="p-2 rounded-full hover:bg-opacity-20 backdrop-blur-md transition-all"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;