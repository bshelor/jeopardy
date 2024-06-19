'use client'

import Image from 'next/image';
import { Question } from '@lib/definitions';
import { useState } from 'react';
import TableCell from './TableCell'
import { getGameData, questions } from '@lib/data';
import Table from './Table';
import type { GetServerSideProps } from "next";
import FileUploader from './FileUploader';
import FileDownloader from './FileDownloader';
import { useEffect } from 'react';
import AnswerCell from './Answer';

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
  const sortedLowToHigh = questions.sort((a, b) => { if (a.Points < b.Points) return -1; else { return 1; } });

  const startingBoard = {
    row1: sortedLowToHigh.filter((q: Question) => q.Points === 100),
    row2: sortedLowToHigh.filter((q: Question) => q.Points === 200),
    row3: sortedLowToHigh.filter((q: Question) => q.Points === 300),
    row4: sortedLowToHigh.filter((q: Question) => q.Points === 400),
    row5: sortedLowToHigh.filter((q: Question) => q.Points === 500)
  };

  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedRow, setSelectedRow] = useState<string | undefined>(undefined);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

  const [csvData, setCsvData] = useState<string[][] | null>(null);
  const [gameBoard, setGameBoard] = useState<Record<string, Question[]>>(startingBoard);
  const [categories, setCategories] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    const headers = csvData ? csvData[0].filter((d: string) => d.trim().length) : [];

    const questionsAsObjects: Question[] = [];
    csvData?.slice(1).forEach((row: string[]) => {
      const questionObj: any = {};
      for (let i = 0; i < headers.length; i++) {
        const header = headers[i];

        if (header === 'Points') {
          questionObj[header] = parseInt(row[i]);
        } else if (header === 'Disabled') {
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
    return newGameBoard;
  };

  const handleGameEnd = () => {
    setGameStarted(false);
  }

  return (
    <div>
      {gameStarted && (
        <div>
          {selectedCell && (
            <AnswerCell
              data={selectedCell}
              clearCellClick={clearSelectedCell}
              row={selectedRow}
              index={selectedIndex}
              disableCell={disableCell}
            />
          )}
          {!selectedCell && (
            <Table
              headers={categories}
              gameBoard={gameBoard}
              handleCellClick={handleCellClick}
              resetGame={resetGame}
              endGame={handleGameEnd}
            />
          )}
        </div>
      )}
      
      {!gameStarted && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div>
            <p className="mb-4 text-2xl">Upload a CSV of game data to begin playing!</p>
          </div>
          <div className="flex items-center space-x-4">
            <FileUploader setCsvData={setCsvData} gameStart={setGameStarted}></FileUploader>
            <FileDownloader></FileDownloader>
          </div>
        </div>
      )}
    </div>
  );
}
