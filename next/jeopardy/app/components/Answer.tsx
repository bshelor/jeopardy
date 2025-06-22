import { useState, useEffect } from 'react';

import TopLeftContent from './TopLeftContent';
import GoBackButton from './GoBackButton';
import DailyDouble from './DailyDouble';
import CountdownTimer from './CountdownTimer';
import { Team } from '../lib/definitions';

export default function AnswerCell({ 
  data, 
  clearCellClick, 
  row, 
  index, 
  disableCell, 
  teams,
  updateTeamScore,
  timerSeconds = 60
}: Record<any, any>) {
  const [visibleText, setVisibleText] = useState(data.Answer);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const [showPointAssignment, setShowPointAssignment] = useState<boolean>(false);
  const [slideIn, setSlideIn] = useState<boolean>(false);
  const [viewTransitioning, setViewTransitioning] = useState<boolean>(false);
  const [transitionDirection, setTransitionDirection] = useState<'question' | 'answer'>('question');
  const [customPoints, setCustomPoints] = useState<string>(data.DailyDouble ? (data.Points * 2).toString() : data.Points.toString());

  useEffect(() => {
    // Trigger slide-in animation after component mounts
    setTimeout(() => {
      setSlideIn(true);
    }, 50);
  }, []);

  // Reset custom points value when data changes or Daily Double status changes
  useEffect(() => {
    setCustomPoints(data.DailyDouble ? (data.Points * 2).toString() : data.Points.toString());
  }, [data.Points, data.DailyDouble]);

  const flipQuestionAndAnswer = () => {
    // Start the transition out
    setViewTransitioning(true);
    
    // Determine which direction we're going
    const goingToQuestion = visibleText === data.Answer;
    setTransitionDirection(goingToQuestion ? 'question' : 'answer');
    
    // After transition out completes, change the content
    setTimeout(() => {
      if (visibleText === data.Question) {
        setVisibleText(data.Answer);
        setShowPointAssignment(false);
      } else {
        // mark the cell as used (will disable it)
        disableCell(row, index);
        setVisibleText(data.Question);
        setShowPointAssignment(true);
      }
      
      // Start transition back in
      setTimeout(() => {
        setViewTransitioning(false);
      }, 50);
    }, 300); // Full transition duration
  };

  const handlePointAssignment = () => {
    if (selectedTeamId) {
      // Always use the value from the custom points input
      const pointsToAssign = parseInt(customPoints);
      
      // Update team score with the custom points
      updateTeamScore(selectedTeamId, pointsToAssign, row, index);
      
      // Start exit animation
      setViewTransitioning(true);
      setTransitionDirection('answer');
      
      // Delay clearing the cell to allow for animation
      setTimeout(() => {
        clearCellClick();
      }, 400);
    }
  };

  const handleNoPoints = () => {
    // Start exit animation
    setViewTransitioning(true);
    setTransitionDirection('answer');
    
    // Delay clearing the cell to allow for animation
    setTimeout(() => {
      clearCellClick();
    }, 400);
  };

  const dailyDoubleStyling = `${data.DailyDouble ? 'border-4 border-yellow-400 ' : 'border border-gray-400 '}`;
  
  // Determine the transition styling for the content
  const getTransitionClasses = () => {
    if (!slideIn) return 'opacity-0 translate-y-10';
    
    if (viewTransitioning) {
      // Different transitions based on direction
      if (transitionDirection === 'question') {
        return 'opacity-0 translate-y-[-20px]';
      } else {
        return 'opacity-0 translate-y-20';
      }
    }
    
    // Default state (visible)
    return 'opacity-100 translate-y-0';
  };
  
  const transitionClasses = getTransitionClasses();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 relative">
      {/* Category and Points display at the top */}
      <div className="w-full bg-blue-600 text-white py-2 px-4 text-center font-bold text-xl shadow-md">
        {data.Category} | {data.Points} {data.DailyDouble && <span className="text-yellow-300">(Daily Double)</span>}
      </div>

      {data.DailyDouble && <DailyDouble></DailyDouble>}

      <div className="absolute top-14 left-2 z-10">
        <GoBackButton handleButtonClick={clearCellClick}></GoBackButton>
      </div>

      <CountdownTimer initialSeconds={timerSeconds} />
      
      <div className="flex items-center justify-center bg-gray-100 flex-1 mt-8 pt-16">
        {/* Main content container with unified transition */}
        <div className={`overflow-x-auto max-w-full mx-8 transform transition-all duration-500 ease-in-out ${transitionClasses}`}>
          {/* Question/Answer Box */}
          <div className={`p-12 bg-gray-200 ${dailyDoubleStyling} rounded text-center shadow-lg`}>
            <p className="text-6xl text-black leading-relaxed tracking-wide font-semibold">{visibleText}</p>
          </div>

          {/* Button Container */}
          <div className="p-4 rounded mt-4 text-center">
            {visibleText === data.Question && (
              <button
                className="mt-4 inline-block bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded border border-gray-700 transition-all duration-300"
                onClick={() => flipQuestionAndAnswer()}
              >
                Show Answer Again
              </button>
            )}
            {visibleText === data.Answer && (
              <button
                className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 transition-all duration-300"
                onClick={() => flipQuestionAndAnswer()}
              >
                Reveal Question
              </button>
            )}

            {showPointAssignment && (
              <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-black">
                  Assign Points
                </h3>
                
                <div className="mb-4">
                  {/* Team Selection */}
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Team</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded mb-3 text-black transition-all duration-300"
                    value={selectedTeamId}
                    onChange={(e) => setSelectedTeamId(e.target.value)}
                  >
                    <option value="" className="text-black">Select a team</option>
                    {teams.map((team: Team) => (
                      <option key={team.id} value={team.id} className="text-black">{team.name} (Current: {team.score})</option>
                    ))}
                  </select>
                  
                  {/* Custom Points Input - Always visible */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Points {data.DailyDouble && <span className="text-yellow-600">(Daily Double)</span>}
                    </label>
                    <input
                      type="number"
                      value={customPoints}
                      onChange={(e) => setCustomPoints(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      placeholder="Enter points (negative allowed)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Default: {data.DailyDouble ? `${data.Points * 2} (Daily Double)` : data.Points} | Negative values allowed
                    </p>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={handlePointAssignment}
                      disabled={!selectedTeamId}
                      className={`px-4 py-2 rounded transition-all duration-300 ${selectedTeamId ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      Assign Points
                    </button>
                    
                    <button
                      onClick={handleNoPoints}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-all duration-300"
                    >
                      No Points
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}