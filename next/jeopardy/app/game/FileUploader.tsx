import { useRef } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import Papa from 'papaparse';

export default function FileUploader({ setCsvData, gameStart }) {
  const handleFileUpload = (event: any) => {
    console.log("🚀 ~ handleFileUpload ~ event:", event)
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {

      const file = event.target.files[0];

      if (file) {
        Papa.parse(file, {
          complete: (results: { data: string[] }) => {
            console.log('Parsed CSV:', results.data);
            setCsvData(results.data);
            
            // Handle parsed data here
          },
          error: (error: any) => {
            console.error('CSV parsing error:', error);
          },
        });
      }
    };
    reader.readAsText(file);

    gameStart(true);
  };

  const fileInputRef = useRef<any>(null);

  const handleButtonClick = () => {
    if (fileInputRef !== null && fileInputRef.current !== null) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileUpload}
      />
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
        <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
        Import Game Data
      </button>
    </div>
  )
}