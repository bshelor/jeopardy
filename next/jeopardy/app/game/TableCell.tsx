export default function TableCell({
  index,
  cellData,
  onCellClick
}) {
  return (
    <td
      key={index}
      className="py-14 px-8 border border-gray-300 cursor-pointer hover:bg-blue-100"
    >
      <button
        className="w-full h-full text-center text-6xl"
        onClick={() => onCellClick(cellData)}
      >
        {cellData.Points}
      </button>
    </td>
  )
}
