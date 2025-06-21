import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

export default function SaveGameButton({ 
  handleButtonClick,
  gameData
}: { 
  handleButtonClick: () => void,
  gameData: any
}) {
  const saveGame = () => {
    // Create a blob with the game data
    const gameState = JSON.stringify(gameData, null, 2);
    const blob = new Blob([gameState], { type: 'application/json' });
    
    // Create a download link and trigger it
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Add timestamp to filename for uniqueness
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    link.href = url;
    link.download = `jeopardy-game-save-${timestamp}.json`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Call the provided handler function
    if (handleButtonClick) {
      handleButtonClick();
    }
  };

  return (
    <button 
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded flex items-center space-x-1 mb-2"
      onClick={saveGame}
    >
      <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
      <span>Save</span>
    </button>
  );
}
