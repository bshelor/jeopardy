import { useState } from 'react';

export default function QuestionCell({ data, clearCellClick }) {
  const [visibleText, setVisibleText] = useState(data.Question);

  const flipQuestionAndAnswer = () => {
    if (visibleText === data.Question) {
      setVisibleText(data.Answer);
    } else {
      setVisibleText(data.Question);
    }
  };

  return (
    <div>
      <button
        className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700"
        onClick={() => clearCellClick()}
      >
        Go Back
      </button>
      <div className="p-4 bg-gray-200 border border-gray-400 mx-auto w-3/4 rounded mt-4 text-center">
        <p className="text-8xl">{visibleText}</p>
      </div>
      <div className="p-4 bg-gray-200 mx-auto w-3/4 rounded mt-4 text-center">
        {visibleText === data.Question && (
          <button
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700"
            onClick={() => flipQuestionAndAnswer()}
          >
            Reveal Answer
          </button>
        )}
        {visibleText === data.Answer && (
          <button
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700"
            onClick={() => flipQuestionAndAnswer()}
          >
            Show Question Again
          </button>
        )}
      </div>
    </div>
  )
}