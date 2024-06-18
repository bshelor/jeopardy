'use client'

import Image from 'next/image';
import { Question } from '@lib/definitions';
import QuestionCell from './Question';
import { useState } from 'react';
import TableCell from './TableCell'
import { getGameData, questions } from '@lib/data';
import Table from './Table';
import type { GetServerSideProps } from "next";
import { useEffect } from 'react';

// export const getStaticProps: GetServerSideProps = async () => {
//   const gameData = await getGameData();
//   return {
//     props: { gameData },
//   };
// };

export default function Game() {
  // console.log("🚀 ~ Game ~ gameData:", gameData)
  const sortedLowToHigh = questions.sort((a, b) => { if (a.Points < b.Points) return -1; else { return 1; } });

  // const headers = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
  const startingBoard = {
    row1: sortedLowToHigh.filter((q: Question) => q.Points === 100),
    row2: sortedLowToHigh.filter((q: Question) => q.Points === 200),
    row3: sortedLowToHigh.filter((q: Question) => q.Points === 300),
    row4: sortedLowToHigh.filter((q: Question) => q.Points === 400),
    row5: sortedLowToHigh.filter((q: Question) => q.Points === 500)
  };

  const [selectedCell, setSelectedCell] = useState(null);
  const [csvData, setCsvData] = useState<string[][] | null>(null);
  const [gameBoard, setGameBoard] = useState(startingBoard);
  const [categories, setCategories] = useState<string[]>([]);

  // const setCsvData = (data: string[][]) => {
  //   console.log("🚀 ~ setCsvData ~ headers:", headers)
  // }

  useEffect(() => {
    console.log("🚀 ~ Game ~ csvData:", csvData)
    const headers = csvData ? csvData[0].filter((d: string) => d.trim().length) : [];
    console.log("🚀 ~ useEffect ~ headers:", headers)

    const questionsAsObjects: Question[] = [];
    csvData?.slice(1).forEach((row: string[]) => {
      const questionObj: any = {};
      for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        console.log("🚀 ~ csvData?.slice ~ header:", header)

        if (header === 'Points') {
          questionObj[header] = parseInt(row[i]);
        } else {
          questionObj[header] = row[i];
        }
        console.log("🚀 ~ csvData?.slice ~ questionObj:", questionObj)

      }
      questionsAsObjects.push(questionObj);
    });

    const sortedLowToHigh = questionsAsObjects.sort((a, b) => { if (a.Points < b.Points) return -1; else { return 1; } });

    const newGameBoard = {
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
    console.log("🚀 ~ useEffect ~ newGameBoard:", newGameBoard)

    setGameBoard(newGameBoard);
  }, [csvData]);

  const handleCellClick = (content: any) => {
    console.log("🚀 ~ handleCellClick ~ content:", content)
    setSelectedCell(content);
  };

  const clearSelectedCell = () => {
    setSelectedCell(null);
  };

  const handleFileUpload = (event: any) => {
    console.log("🚀 ~ handleFileUpload ~ event:", event)
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e?.target?.result;
      console.log("🚀 ~ handleFileUpload ~ text:", text)

      let rows;
      if (text && typeof text === 'string') {
        rows = text.split('\n').map((row) => row.split(','));
        console.log("🚀 ~ handleFileUpload ~ rows:", rows)
      } 
      setCsvData(rows as any);
    };
    reader.readAsText(file);
  };

  return (
    <div className="overflow-x-auto table-container">
      <div>
        {selectedCell && (<QuestionCell data={selectedCell} clearCellClick={clearSelectedCell}/>)}
        {!selectedCell && <Table headers={categories} gameBoard={gameBoard} handleCellClick={handleCellClick} />}
      </div>
      
      <input className="mx-auto" type="file" onChange={handleFileUpload} 
            accept=".csv"
      />
    </div>
  );
}
