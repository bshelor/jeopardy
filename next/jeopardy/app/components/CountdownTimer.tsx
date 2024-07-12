import { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let secondsLeft = null;

    if (difference > 0) {
      secondsLeft = Math.floor((difference / 1000) % 60)
      // timeLeft = {
      //   days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      //   hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      //   minutes: Math.floor((difference / 1000 / 60) % 60),
      //   seconds: Math.floor((difference / 1000) % 60),
      // };
    }

    return secondsLeft;
  };

  const [secondsLeft, setSecondsLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setSecondsLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    // "fixed top-0 right-0"
    <div className="m-8 p-2 rounded flex fixed top-0 right-0 items-center">
      {/* <button className="p-4 bg-blue-500 text-white rounded">Reset</button> */}
      {secondsLeft ? (
        <div className="m-4 p-4 bg-gray-800 text-white rounded">
          <p className="text-6xl">{secondsLeft}</p>
        </div>
      ) : (
        <p className="m-2 p-4 text-6xl">Time is up!</p>
      )}
    </div>
  );
};

export default CountdownTimer;
