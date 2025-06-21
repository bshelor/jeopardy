import { useState } from 'react';

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
  updateTeamScore
}: Record<any, any>) {
  const [visibleText, setVisibleText] = useState(data.Answer);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const [showTeamSelection, setShowTeamSelection] = useState<boolean>(false);

  const flipQuestionAndAnswer = () => {
    if (visibleText === data.Question) {
      setVisibleText(data.Answer);
    } else {
      // mark the cell as used (will disable it)
      disableCell(row, index);
      setVisibleText(data.Question);
      setShowTeamSelection(true);
    }
  };

  const handlePointAssignment = () => {
    if (selectedTeamId) {
      updateTeamScore(selectedTeamId, data.Points, row, index);
      setShowTeamSelection(false);
      clearCellClick();
    }
  };

  const handleNoPoints = () => {
    setShowTeamSelection(false);
    clearCellClick();
  };

  const dailyDoubleStyling = `${data.DailyDouble ? 'border-4 border-yellow-400 ' : 'border border-gray-400 '}`;
  const textBoxStyling =
    `p-12 bg-gray-200 ${dailyDoubleStyling} rounded mt-4 text-center`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {data.DailyDouble && <DailyDouble></DailyDouble>}

      <TopLeftContent>
        <GoBackButton handleButtonClick={clearCellClick}></GoBackButton>
      </TopLeftContent>

      <CountdownTimer targetDate={new Date(new Date().getTime() + 60 * 1000)}></CountdownTimer>
      
      <div className="flex items-center justify-center bg-gray-100">
        <div className="overflow-x-auto max-w-full mx-8">

          {data.DailyDouble && <div className="text-xl text-yellow-400 text-center font-bold"><p>Daily Double</p></div>}
          
          <div className={textBoxStyling}>
            <p className="text-6xl leading-relaxed tracking-wide font-semibold">{visibleText}</p>
          </div>

          <div className="p-4 rounded mt-4 text-center">
            {visibleText === data.Question && !showTeamSelection && (
              <button
                className="mt-4 inline-block bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded border border-gray-700"
                onClick={() => flipQuestionAndAnswer()}
              >
                Show Answer Again
              </button>
            )}
            {visibleText === data.Answer && (
              <button
                className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700"
                onClick={() => flipQuestionAndAnswer()}
              >
                Reveal Question
              </button>
            )}

            {showTeamSelection && (
              <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-black">Assign Points: {data.Points}</h3>
                
                <div className="mb-4">
                  <select 
                    className="w-full p-2 border border-gray-300 rounded mb-3 text-black"
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
                      className={`px-4 py-2 rounded ${selectedTeamId ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      Assign Points
                    </button>
                    
                    <button
                      onClick={handleNoPoints}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
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