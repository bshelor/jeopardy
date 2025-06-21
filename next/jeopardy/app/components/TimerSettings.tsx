import { useState } from 'react';

interface TimerSettingsProps {
  timerSeconds: number;
  setTimerSeconds: (seconds: number) => void;
  showTimerSettings: boolean;
  setShowTimerSettings: (show: boolean) => void;
}

export default function TimerSettings({ 
  timerSeconds, 
  setTimerSeconds, 
  showTimerSettings, 
  setShowTimerSettings 
}: TimerSettingsProps) {
  const [inputValue, setInputValue] = useState(timerSeconds.toString());

  const handleSave = () => {
    const seconds = parseInt(inputValue);
    if (!isNaN(seconds) && seconds > 0) {
      setTimerSeconds(seconds);
    } else {
      // Reset to current value if invalid input
      setInputValue(timerSeconds.toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className="absolute top-32 left-2 z-10">
      <div id="timer-settings" className={`bg-white bg-opacity-95 p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 w-[215px]`}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-black pr-4">Timer Settings</h3>
          <button 
            onClick={() => setShowTimerSettings(!showTimerSettings)} 
            className="px-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white"
            aria-label="Toggle timer settings"
          >
            {showTimerSettings ? 'X' : '⚙️'}
          </button>
        </div>

        {showTimerSettings && (
          <div className="mb-2 transition-all duration-300">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seconds per Question:
            </label>
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full p-2 border border-gray-300 rounded-l text-black"
                placeholder="60"
              />
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded-r"
              >
                Save
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1 mb-3">
              Current: {timerSeconds} seconds
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
