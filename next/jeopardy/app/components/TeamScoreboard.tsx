import { useState } from 'react';
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Team } from '../lib/definitions';

interface TeamScoreboardProps {
  teams: Team[];
  addTeam: (name: string) => void;
  showTeamModal: boolean;
  setShowTeamModal: (show: boolean) => void;
  updateTeamName?: (teamId: string, newName: string) => void;
  timerSettingsOpen?: boolean;
}

export default function TeamScoreboard({ 
  teams, 
  addTeam, 
  showTeamModal, 
  setShowTeamModal,
  updateTeamName = () => {}, // Default empty function
  timerSettingsOpen = false
}: TeamScoreboardProps) {
  const [newTeamName, setNewTeamName] = useState<string>('');
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>('');

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      addTeam(newTeamName);
      setNewTeamName('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (editingTeamId) {
        handleSaveEdit();
      } else {
        handleAddTeam();
      }
    }
  };

  const startEditingTeam = (team: Team) => {
    setEditingTeamId(team.id);
    setEditedName(team.name);
  };

  const handleSaveEdit = () => {
    if (editingTeamId && editedName.trim() && updateTeamName) {
      updateTeamName(editingTeamId, editedName);
      setEditingTeamId(null);
      setEditedName('');
    }
  };

  const cancelEditing = () => {
    setEditingTeamId(null);
    setEditedName('');
  };

  return (
    <div className={`absolute left-2 z-10 transition-all duration-300 ${timerSettingsOpen ? 'top-[320px]' : 'top-[220px]'}`}>
      <div className={`bg-white bg-opacity-95 p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 ${showTeamModal ? 'w-[350px]' : 'w-[215px]'}`}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-black pr-4">Scoreboard</h3>
          <button 
            onClick={() => setShowTeamModal(!showTeamModal)} 
            className={`p-1 rounded-full ${showTeamModal ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            aria-label={showTeamModal ? 'Hide team form' : 'Add team'}
          >
            {showTeamModal ? 
              <XMarkIcon className="h-5 w-5" /> :
              <PencilIcon className="h-5 w-5" />
            }
          </button>
        </div>

        {showTeamModal && (
          <div className="mb-4 border-b pb-3">
            <div className="flex w-full">
              <input 
                type="text" 
                value={newTeamName} 
                onChange={(e) => setNewTeamName(e.target.value)} 
                onKeyPress={handleKeyPress}
                className="flex-grow p-2 border border-gray-300 rounded-l text-black min-w-0"
                placeholder="Team name"
                autoFocus
              />
              <button 
                onClick={handleAddTeam} 
                className="bg-green-500 hover:bg-green-600 text-white px-3 rounded-r whitespace-nowrap"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {teams.length > 0 ? (
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left p-2 text-black font-bold">Team</th>
                  <th className="text-right p-2 text-black font-bold">Score</th>
                </tr>
              </thead>
              <tbody>
                {teams.sort((a, b) => a.score < b.score ? 1 : -1).map((team: Team) => (
                  <tr key={team.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="text-left p-2 text-black">
                      {editingTeamId === team.id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="p-1 border border-gray-300 rounded text-black min-w-0 w-full"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between group">
                          <span className="truncate max-w-[160px]">{team.name}</span>
                          {showTeamModal && (
                            <button 
                              onClick={() => startEditingTeam(team)} 
                              className="ml-1 text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <div className="border bg-black border-black rounded p-[2px] text-white">
                                <PencilIcon className="h-3 w-3" />
                              </div>
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="text-right p-2 font-bold text-black text-lg">
                      {editingTeamId === team.id ? (
                        <div className="flex space-x-1 justify-end">
                          <button 
                            onClick={handleSaveEdit} 
                            className="text-green-500 hover:text-green-700 mr-2"
                          >
                            ✓
                          </button>
                          <button 
                            onClick={cancelEditing} 
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        team.score
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic text-center py-2">No teams added yet</p>
        )}
      </div>
    </div>
  );
}
