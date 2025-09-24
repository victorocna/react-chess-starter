import Timer from './Timer';

const PlayerCard = ({ name, icon, showTimer, isActive, initialTime, increment, onTimeOut }) => {
  return (
    <div className="flex items-center justify-between gap-4 lg:p-2 p-1 bg-white rounded-md border border-gray-200 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 rounded">
          <div className="lg:w-12 lg:h-12 w-10 h-10 flex items-center justify-center rounded-md">
            <i className={`fas ${icon} text-xl text-gray-600`}></i>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-900 font-semibold text-base">{name}</p>
        </div>
      </div>
      {showTimer && (
        <Timer
          initialTime={initialTime}
          isActive={isActive}
          increment={increment}
          onTimeOut={onTimeOut}
        />
      )}
    </div>
  );
};

export default PlayerCard;
