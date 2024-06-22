import { Question } from "./definitions";
// import { read } from '@lib/csv';

import type { GetServerSideProps } from "next";

// export const getGameData = async () => {
//   const data = await read('./game_data.csv');
//   return data;
// };

// export const questions: Question[] = [
//   {
//     points: 500,
//     category: 'Category 1',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 500,
//     category: 'Category 2',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 500,
//     category: 'Category 3',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 500,
//     category: 'Category 4',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 500,
//     category: 'Category 5',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 400,
//     category: 'Category 1',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 400,
//     category: 'Category 2',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 400,
//     category: 'Category 3',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 400,
//     category: 'Category 4',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 400,
//     category: 'Category 5',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 300,
//     category: 'Category 1',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 300,
//     category: 'Category 2',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 300,
//     category: 'Category 3',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 300,
//     category: 'Category 4',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 300,
//     category: 'Category 5',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 200,
//     category: 'Category 1',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 200,
//     category: 'Category 2',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 200,
//     category: 'Category 3',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 200,
//     category: 'Category 4',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 200,
//     category: 'Category 5',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 100,
//     category: 'Category 1',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 100,
//     category: 'Category 2',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 100,
//     category: 'Category 3',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 100,
//     category: 'Category 4',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   },
//   {
//     points: 100,
//     category: 'Category 5',
//     question: 'This is a statement',
//     answer: 'This is an answer',
//   }
// ];


// // getGameData()
// //   .then(res => console.log(res))
// //   .catch(err => console.error(err));
