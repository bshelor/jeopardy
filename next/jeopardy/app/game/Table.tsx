import TableCell from "./TableCell";

export default function Table({ headers, gameBoard, handleCellClick }) {
  return (
    <table className="min-w-max max-w-8xl mx-auto bg-white border border-gray-200">
        <thead className="w-full bg-blue-500 text-white">
          <tr>
            {
              headers.map((key: string, index: number) => {
                return <th key={`${key}-${index}`} className="p-8 border-b-2 border-gray-300 text-center text-3xl">{key}</th>
              })
            }
          </tr>
        </thead>

        <tbody>
          {Object.keys(gameBoard).map((row, index) => (
            <tr key={index} className="bg-white border border-gray-300">
              {Object.values(gameBoard[row as keyof typeof gameBoard]).map((question, i) => (
                <TableCell index={i} cellData={question} onCellClick={handleCellClick}></TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
  )

}
