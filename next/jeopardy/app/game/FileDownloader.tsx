import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import Link from 'next/Link';

export default function FileDownloader() {
  return (
    <div className="p-4">
      <Link href="/downloads/game_data.csv" passHref legacyBehavior>
          <a
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
          download
        >
          <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
          Download Template
        </a>
      </Link>
    </div>
  )
}