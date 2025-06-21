'use client'

import { Question, Team, CellPoints } from '../lib/definitions';
import { useState, useEffect } from 'react';
import Table from '../components/Table';
import FileUploader from '../components/FileUploader';
import FileDownloader from '../components/FileDownloader';
import AnswerCell from '../components/Answer';
import TimerSettings from '../components/TimerSettings';

const isFalse = (s: string) => {
  switch (s) {
    case 'False':
    case 'false':
    case 'FALSE':
      return true;
    default:
      return false;
  }
}

export default function Game() {
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedRow, setSelectedRow] = useState<string | undefined>(undefined);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

  const [csvData, setCsvData] = useState<string[][] | null>(null);
  const [gameBoard, setGameBoard] = useState<Record<string, Question[]>>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [boardReady, setBoardReady] = useState<boolean>(false);
  
  // Add team state
  const [teams, setTeams] = useState<Team[]>([]);
  const [showTeamModal, setShowTeamModal] = useState<boolean>(false);
  const [cellPointsMap, setCellPointsMap] = useState<CellPoints[]>([]); // Track which team received points for each cell
  
  // Timer settings state
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [showTimerSettings, setShowTimerSettings] = useState<boolean>(false);

  useEffect(() => {
    const headers = csvData ? csvData[0].filter((d: string) => d.trim().length) : [];

    const questionsAsObjects: Question[] = [];
    csvData?.slice(1).forEach((row: string[]) => {
      const questionObj: any = {};
      for (let i = 0; i < headers.length; i++) {
        const header = headers[i];

        if (header === 'Points') {
          questionObj[header] = parseInt(row[i]);
        } else if (header === 'Disabled' || header === 'DailyDouble') {
          questionObj[header] = !isFalse(row[i]);
        } else {
          questionObj[header] = row[i];
        }

      }
      questionsAsObjects.push(questionObj);
    });

    const sortedLowToHigh = questionsAsObjects.sort((a, b) => { if (a.Points < b.Points) return -1; else { return 1; } });

    const newGameBoard: Record<string, Question[]> = {
      row1: sortedLowToHigh.filter((q: Question) => q.Points === 100),
      row2: sortedLowToHigh.filter((q: Question) => q.Points === 200),
      row3: sortedLowToHigh.filter((q: Question) => q.Points === 300),
      row4: sortedLowToHigh.filter((q: Question) => q.Points === 400),
      row5: sortedLowToHigh.filter((q: Question) => q.Points === 500)
    };

    const categories = sortedLowToHigh.reduce((categories: string[], current: Question) => {
      if (!categories.includes(current.Category)) {
        categories.push(current.Category);
      }
      return categories;
    }, []);
    setCategories(categories);

    setGameBoard(newGameBoard);
  }, [csvData]);

  const handleCellClick = (content: any, row: string, index: number) => {
    setSelectedRow(row);
    setSelectedIndex(index);
    setSelectedCell(content);
  };

  /**
   * Set cell as disabled which means the question has been revealed. That cell
   * is not allowed to be chosen again during the duration of the game.
   * @param row - string representing the key of the row in the gameBoard obj
   * @param index - number index of which item in the array we are accessing
   */
  const disableCell = (row: string, index: number) => {
    const cellToDisable = gameBoard[row as keyof typeof gameBoard][index];
    cellToDisable.Disabled = true;
  }

  const clearSelectedCell = () => {
    setSelectedCell(null);
  };

  const resetGame = () => {
    const newGameBoard = Object.keys(gameBoard).reduce((newBoard: Record<string, Question[]>, currentRow: string) => {
      const newRowValues = Object.values(gameBoard[currentRow as keyof typeof gameBoard]).map(cellToReset => {
        return {
          ...cellToReset,
          Disabled: false
        };
      });
      newBoard[currentRow as keyof typeof gameBoard] = newRowValues;
      return newBoard;
    }, {});

    setGameBoard(newGameBoard);
    setCellPointsMap([]);
    for (const team of teams) { // Reset team scores to 0
      team.score = 0;
    }
    return newGameBoard;
  };

  const handleGameEnd = () => {
    setBoardReady(false);
    setCellPointsMap([]);
    setTeams([]); // Clear teams
  }

  /**
   * Add a new team to the game
   * @param name - Name of the team to add
   */
  const addTeam = (name: string) => {
    if (name.trim() === '') return;
    
    const newTeam: Team = {
      id: Date.now().toString(),
      name: name.trim(),
      score: 0
    };
    
    setTeams([...teams, newTeam]);
  };

  /**
   * Update a team's score
   * @param teamId - ID of the team to update
   * @param points - Points to add to the team's score
   * @param row - Row of the cell
   * @param cellIndex - Index of the cell
   */
  const updateTeamScore = (teamId: string, points: number, row?: string, cellIndex?: number) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return { ...team, score: team.score + points };
      }
      return team;
    }));

    // If row and cellIndex are provided, track which team received points for this cell
    if (row !== undefined && cellIndex !== undefined) {
      setCellPointsMap([
        ...cellPointsMap,
        { rowId: row, cellIndex, points, teamId }
      ]);
    }
  };

  /**
   * Update a team's name
   * @param teamId - ID of the team to update
   * @param newName - New name for the team
   */
  const updateTeamName = (teamId: string, newName: string) => {
    if (newName.trim() === '') return;
    
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return { ...team, name: newName.trim() };
      }
      return team;
    }));
  };

  /**
   * Reassign points from one team to another or assign points to a team if not already assigned
   * @param row - Row of the cell
   * @param cellIndex - Index of the cell
   * @param toTeamId - ID of the team to give points to
   */
  const reassignPoints = (row: string, cellIndex: number, toTeamId: string) => {
    // Find the cell points record
    const cellPointsRecord = cellPointsMap.find(
      record => record.rowId === row && record.cellIndex === cellIndex
    );

    // Get the points value from the gameBoard
    const cellData = gameBoard[row as keyof typeof gameBoard][cellIndex];
    const points = cellData.Points;

    if (!cellPointsRecord) {
      // This is a new assignment (no team had these points before)
      // Update the team's score
      setTeams(teams.map(team => {
        if (team.id === toTeamId) {
          return { ...team, score: team.score + points };
        }
        return team;
      }));

      // Add to cell points map
      setCellPointsMap([
        ...cellPointsMap,
        { rowId: row, cellIndex, points, teamId: toTeamId }
      ]);
      return;
    }

    const { teamId: fromTeamId } = cellPointsRecord;
    
    // If reassigning to the same team, do nothing
    if (fromTeamId === toTeamId) return;

    // Update teams' scores
    setTeams(teams.map(team => {
      if (team.id === fromTeamId) {
        return { ...team, score: team.score - points };
      }
      if (team.id === toTeamId) {
        return { ...team, score: team.score + points };
      }
      return team;
    }));

    // Update cell points map
    setCellPointsMap(cellPointsMap.map(record => {
      if (record.rowId === row && record.cellIndex === cellIndex) {
        return { ...record, teamId: toTeamId };
      }
      return record;
    }));
  };

  return (
    <div className="bg-gray-400 dark:bg-gray-400 min-h-screen">
      {boardReady && (
        <div>
          {selectedCell && (
            <AnswerCell
              data={selectedCell}
              clearCellClick={clearSelectedCell}
              row={selectedRow}
              index={selectedIndex}
              disableCell={disableCell}
              teams={teams}
              updateTeamScore={updateTeamScore}
              timerSeconds={timerSeconds}
            />
          )}
          {!selectedCell && (
            <Table
              headers={categories}
              gameBoard={gameBoard}
              handleCellClick={handleCellClick}
              resetGame={resetGame}
              endGame={handleGameEnd}
              teams={teams}
              addTeam={addTeam}
              showTeamModal={showTeamModal}
              setShowTeamModal={setShowTeamModal}
              updateTeamName={updateTeamName}
              reassignPoints={reassignPoints}
              cellPointsMap={cellPointsMap}
              timerSeconds={timerSeconds}
              setTimerSeconds={setTimerSeconds}
              showTimerSettings={showTimerSettings}
              setShowTimerSettings={setShowTimerSettings}
            />
          )}
        </div>
      )}
      
      {!boardReady && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 dark:bg-gray-400">
          <div>
            <p className="mb-4 text-2xl">Upload a CSV of game data to begin playing!</p>
          </div>
          <div className="flex items-center space-x-4">
            <FileUploader setCsvData={setCsvData} gameStart={setBoardReady}></FileUploader>
            <FileDownloader></FileDownloader>
          </div>
        </div>
      )}
    </div>
  );
}
