import { useState, useEffect, useRef } from 'react';

interface CountdownTimerProps {
  initialSeconds: number;
  onTimeUp?: () => void;
}

const CountdownTimer = ({ initialSeconds, onTimeUp }: CountdownTimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = (seconds: number = 15) => {
    setSecondsLeft(seconds);
    setIsActive(true);
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setIsActive(false);
            onTimeUp && onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, onTimeUp]);

  // Timer color changes based on time left
  const getTimerColor = () => {
    if (secondsLeft > 10) return 'bg-green-600';
    if (secondsLeft > 5) return 'bg-yellow-500';
    return 'bg-red-600';
  };

  return (
    <div className="p-2 fixed top-0 right-0 flex items-center">
      <div className="mr-4">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          onClick={() => resetTimer()}
        >
          Steal
        </button>
      </div>
      
      <div className="w-32 h-32 flex items-center justify-center">
        {secondsLeft > 0 ? (
          <div className={`w-full h-full ${getTimerColor()} text-white rounded flex items-center justify-center transition-colors`}>
            <p className="text-6xl">{secondsLeft}</p>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-800 text-white rounded flex items-center justify-center">
            <p className="text-4xl text-center">Time&apos;s up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
