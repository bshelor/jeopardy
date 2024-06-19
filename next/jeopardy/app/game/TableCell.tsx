export default function TableCell({
  index,
  cellData,
  onCellClick,
  row,
}) {
  const isDisabled = cellData.Disabled ? cellData.Disabled : false;
  const cellStyling = `py-14 px-8 border border-gray-300 cursor-pointer ${isDisabled ? 'bg-black' : 'hover:bg-blue-100'}`;
  const buttonStyling = `w-full h-full text-center text-6xl ${isDisabled ? 'text-gray-400' : ''}`;
  return (
    <td
      key={index}
      className={cellStyling}
    >
      <button
        className={buttonStyling}
        onClick={() => onCellClick(cellData, row, index)}
        disabled={isDisabled}
      >
        {cellData.Points}
      </button>
    </td>
  )
}
