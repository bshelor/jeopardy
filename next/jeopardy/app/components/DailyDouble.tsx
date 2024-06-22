import FullPageFlash from './FullPageFlash';

const DailyDouble = () => {
  return (
    <FullPageFlash>
      <div className="z-50 bg-yellow-400 flex items-center justify-center fixed inset-0">
        <div className="p-8 flex items-center justify-center">
          <p className="text-center font-semibold text-8xl">Daily Double!!</p>
        </div>
      </div>
    </FullPageFlash>
  )
};

export default DailyDouble;
