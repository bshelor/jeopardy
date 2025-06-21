import TableCell from "./TableCell";
import ResetGameButton from './ResetGameButton';
import EndGameButton from './EndGameButton';
import TopLeftContent from "./TopLeftContent";

export default function Table({ headers, gameBoard, handleCellClick, resetGame, endGame }: Record<any, any>) {
  return (
    <div className="relative min-h-screen">
      <TopLeftContent>
        <EndGameButton handleButtonClick={endGame}></EndGameButton>
        <ResetGameButton handleButtonClick={resetGame}></ResetGameButton>
      </TopLeftContent>

      <div className="flex items-center justify-center pt-2 pl-24">
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
                    <TableCell key={i} index={i} cellData={question} onCellClick={handleCellClick} row={row}></TableCell>
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
