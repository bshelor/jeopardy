import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { Team, CellPoints } from '../lib/definitions';

export default function TableCell({
  index,
  cellData,
  onCellClick,
  row,
  teams,
  reassignPoints,
  cellPointsMap = [],
}: {
  index: number;
  cellData: any;
  onCellClick: (cellData: any, row: string, index: number) => void;
  row: string;
  teams: Team[];
  reassignPoints: (row: string, cellIndex: number, toTeamId: string) => void;
  cellPointsMap?: CellPoints[];
}) {
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  
  const isDisabled = cellData.Disabled ? cellData.Disabled : false;
  const cellStyling = `border border-gray-300 ${isDisabled ? 'bg-black relative' : 'hover:bg-blue-100 cursor-pointer'}`;
  const buttonStyling = `py-14 px-8 w-full h-full text-center text-6xl ${isDisabled ? 'text-white' : 'text-black'}`;
  
  // Find the cell points record to determine which team has the points
  const cellPointsRecord = cellPointsMap.find(
    record => record.rowId === row && record.cellIndex === index
  );
  
  // Find the team that has these points
  const currentTeamWithPoints = cellPointsRecord 
    ? teams.find((team: Team) => team.id === cellPointsRecord.teamId) 
    : null;
  
  const handleReassignClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowReassignModal(true);
  };
  
  const handleReassignPoints = () => {
    if (selectedTeamId) {
      reassignPoints(row, index, selectedTeamId);
      setShowReassignModal(false);
      setSelectedTeamId('');
    }
  };
  
  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowReassignModal(false);
    setSelectedTeamId('');
  };
  
  return (
    <td
      key={index}
      className={cellStyling}
    >
      <button
        className={buttonStyling}
        onClick={() => onCellClick(cellData, row, index)}
        disabled={isDisabled}
      >
        {cellData.Points}
      </button>
      
      {isDisabled && cellPointsRecord && (
        <button
          onClick={handleReassignClick}
          className="absolute top-1 right-1 opacity-50 hover:opacity-100 transition-opacity z-10"
          aria-label="Reassign points"
        >
          <div className="border border-white p-0.5 rounded bg-black">
            <PencilIcon className="h-4 w-4 text-white" />
          </div>
        </button>
      )}
      
      {showReassignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96 max-w-[90vw]">
            <h3 className="text-lg font-bold mb-3 text-black">Reassign {cellData.Points} Points</h3>
            
            {currentTeamWithPoints && (
              <p className="mb-2 text-sm text-gray-600">
                Currently assigned to: {currentTeamWithPoints.name}
              </p>
            )}
            
            <select 
              className="w-full p-2 border border-gray-300 rounded mb-3 text-black"
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
            >
              <option value="" className="text-black">Select a team</option>
              {teams.map((team: Team) => (
                team.id !== currentTeamWithPoints?.id && (
                  <option key={team.id} value={team.id} className="text-black">
                    {team.name} (Current: {team.score})
                  </option>
                )
              ))}
            </select>
            
            <div className="flex justify-between mt-3">
              <button
                onClick={handleReassignPoints}
                disabled={!selectedTeamId}
                className={`px-3 py-1 rounded text-sm ${selectedTeamId ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Reassign
              </button>
              
              <button
                onClick={closeModal}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </td>
  );
}
