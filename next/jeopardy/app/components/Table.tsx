import TableCell from "./TableCell";
import ResetGameButton from './ResetGameButton';
import EndGameButton from './EndGameButton';
import TopLeftContent from "./TopLeftContent";

export default function Table({ headers, gameBoard, handleCellClick, resetGame, endGame }: Record<any, any>) {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <TopLeftContent>
        <EndGameButton handleButtonClick={endGame}></EndGameButton>
        <ResetGameButton handleButtonClick={resetGame}></ResetGameButton>
      </TopLeftContent>

      <div className="flex items-center justify-center bg-gray-100">
        <div className="overflow-x-auto max-w-full">
          <table className="table-auto bg-white border border-gray-200">
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
                <tr key={index} className="bg-white border border-gray-300">
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
