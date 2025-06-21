'use client';

import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

import Button from './components/Button';
import { PlayIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/game');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center space-y-8 text-center">
        <h1 className="text-6xl font-bold">Jeopardy</h1>
        <Button handleButtonClick={handleButtonClick} icon={PlayIcon} buttonText="Play Now"></Button>
      </div>
    </main>
  );
}
