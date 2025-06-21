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

  useEffect(() => {
    // Trigger slide-in animation after component mounts
    setTimeout(() => {
      setSlideIn(true);
    }, 50);
  }, []);

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
      if (data.DailyDouble) {
        // Double the points for Daily Double
        updateTeamScore(selectedTeamId, data.Points * 2, row, index);
      } else {
        // Regular point assignment
        updateTeamScore(selectedTeamId, data.Points, row, index);
      }
      
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {data.DailyDouble && <DailyDouble></DailyDouble>}

      <TopLeftContent>
        <GoBackButton handleButtonClick={clearCellClick}></GoBackButton>
      </TopLeftContent>

      <CountdownTimer initialSeconds={timerSeconds} />
      
      <div className="flex items-center justify-center bg-gray-100">
        {/* Main content container with unified transition */}
        <div className={`overflow-x-auto max-w-full mx-8 transform transition-all duration-500 ease-in-out ${transitionClasses}`}>
          {data.DailyDouble && <div className="text-xl text-yellow-400 text-center font-bold"><p>Daily Double</p></div>}
          
          {/* Question/Answer Box */}
          <div className={`p-12 bg-gray-200 ${dailyDoubleStyling} rounded mt-4 text-center shadow-lg`}>
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
                <h3 className="text-lg font-bold mb-3 text-black">Assign Points: {data.DailyDouble ? (data.Points * 2) : data.Points}</h3>
                
                <div className="mb-4">
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
                  
                  <div className="flex justify-between">
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