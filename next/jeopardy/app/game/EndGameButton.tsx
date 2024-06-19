import ExitIcon from '@lib/customIcons/ExitIcon';

export default function EndGameButton({ handleButtonClick }) {
  return (
    <div className="py-2">
      <button
        onClick={handleButtonClick}
        className="
          flex
          items-center
          px-2 
          py-2 
          bg-blue-500 
          text-white 
          font-semibold 
          rounded-lg 
          shadow-md 
          hover:bg-blue-700 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:ring-opacity-75 
          transition 
          duration-300
        "
      >
        <ExitIcon></ExitIcon>
        End Game
      </button>
    </div>
    
  )
}