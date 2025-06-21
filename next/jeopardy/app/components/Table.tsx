import TableCell from "./TableCell";
import ResetGameButton from './ResetGameButton';
import EndGameButton from './EndGameButton';
import TopLeftContent from "./TopLeftContent";
import TeamScoreboard from "./TeamScoreboard";
import TimerSettings from "./TimerSettings";
import { Team } from '../lib/definitions';

export default function Table({ 
  headers, 
  gameBoard, 
  handleCellClick, 
  resetGame, 
  endGame,
  teams,
  addTeam,
  showTeamModal,
  setShowTeamModal,
  updateTeamName,
  reassignPoints,
  cellPointsMap = [],
  timerSeconds,
  setTimerSeconds,
  showTimerSettings,
  setShowTimerSettings
}: Record<any, any>) {
  return (
    <div className="relative min-h-screen">
      <TopLeftContent>
        <EndGameButton handleButtonClick={endGame}></EndGameButton>
        <ResetGameButton handleButtonClick={resetGame}></ResetGameButton>
      </TopLeftContent>

      {/* Timer Settings */}
      <div className="settings-container relative">
        <TimerSettings
          timerSeconds={timerSeconds}
          setTimerSeconds={setTimerSeconds}
          showTimerSettings={showTimerSettings}
          setShowTimerSettings={setShowTimerSettings}
        />

        {/* Team Scoreboard */}
        <TeamScoreboard 
          teams={teams}
          addTeam={addTeam}
          showTeamModal={showTeamModal}
          setShowTeamModal={setShowTeamModal}
          updateTeamName={updateTeamName}
          timerSettingsOpen={showTimerSettings}
        />
      </div>

      <div className="flex items-center justify-center pt-4 pl-20 ml-32">
        <div className="overflow-x-auto max-w-full">
          <table className="table-auto border border-gray-200">
            <thead className="w-full bg-blue-500 text-white">
              <tr>
                {
                  headers.map((key: string, index: number) => {
                    return <th key={`${key}-${index}`} className="py-2 px-4 border-b-2 border-gray-300 text-center text-3xl">{key}</th>
                  })
                }
              </tr>
            </thead>

            <tbody>
              {Object.keys(gameBoard).map((row, index) => (
                <tr key={index} className="border border-gray-300 bg-gray-200 dark:bg-gray-200">
                  {Object.values(gameBoard[row as keyof typeof gameBoard]).map((question, i) => (
                    <TableCell 
                      key={i} 
                      index={i} 
                      cellData={question} 
                      onCellClick={handleCellClick} 
                      row={row}
                      teams={teams}
                      reassignPoints={reassignPoints}
                      cellPointsMap={cellPointsMap}
                    ></TableCell>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
