import { useState } from 'react';
import TopLeftContent from './TopLeftContent';
import GoBackButton from './GoBackButton';
import DailyDouble from '../components/DailyDouble';

export default function AnswerCell({ data, clearCellClick, row, index, disableCell }: Record<any, any>) {
  const [visibleText, setVisibleText] = useState(data.Answer);

  const flipQuestionAndAnswer = () => {
    if (visibleText === data.Question) {
      setVisibleText(data.Answer);
    } else {
      // mark the cell as used (will disable it)
      disableCell(row, index);
      setVisibleText(data.Question);
    }
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
      
      <div className="flex items-center justify-center bg-gray-100">
        <div className="overflow-x-auto max-w-full mx-8">

          {data.DailyDouble && <div className="text-xl text-yellow-400 text-center font-bold"><p>Daily Double</p></div>}
          
          <div className={textBoxStyling}>
            <p className="text-6xl leading-relaxed tracking-wide font-semibold">{visibleText}</p>
          </div>

          <div className="p-4 rounded mt-4 text-center">
            {visibleText === data.Question && (
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
          </div>
        </div>
      </div>
    </div>
  )
}