export default function Button({ handleButtonClick, icon, buttonText }: Record<any, any>) {
  return (
    <button
      onClick={handleButtonClick}
      className="
        flex
        items-center
        px-4 
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
      {icon && (icon)}
      {buttonText}
    </button>
  );
}
