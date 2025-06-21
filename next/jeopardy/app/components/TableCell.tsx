export default function TableCell({
  index,
  cellData,
  onCellClick,
  row,
}: Record<any, any>) {
  const isDisabled = cellData.Disabled ? cellData.Disabled : false;
  const cellStyling = `border border-gray-300 cursor-pointer ${isDisabled ? 'bg-black' : 'hover:bg-blue-100'}`;
  const buttonStyling = `py-14 px-8 w-full h-full text-center text-6xl ${isDisabled ? 'text-white' : 'text-black'}`;
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
