export default function LoadGameButton({ 
  handleFileLoad 
}: { 
  handleFileLoad: (gameData: any) => void 
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const gameData = JSON.parse(e.target?.result as string);
        handleFileLoad(gameData);
      } catch (err) {
        console.error('Error loading game file:', err);
        alert('Error loading game file. Please make sure it is a valid Jeopardy game save file.');
      }
    };
    
    reader.readAsText(file);
    
    // Reset the input so the same file can be selected again
    event.target.value = '';
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        title="Load a saved Jeopardy game"
      />
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center space-x-1 mb-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        <span>Load Game</span>
      </button>
    </div>
  );
}
