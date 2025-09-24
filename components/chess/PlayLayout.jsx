import { GameBoard, PlayerCard } from '@chess/components/Play';
import { GameSheet } from '@chess/components';
import { useChessContext } from '@chess/contexts';
import { playEngineConfigs } from '@chess/constants/engine-configs';
import { useEffect } from 'react';

const PlayLayout = ({ handleGameOver, handleGameStart, elo, timeControl }) => {
  const { history, initialFen, isUserTurn } = useChessContext();

  // Track when the first move is made to detect game start
  useEffect(() => {
    if (history && history.length > 0 && handleGameStart) {
      handleGameStart();
    }
  }, [history, handleGameStart]);

  const handleUserTimeout = () => {
    if (handleGameOver) {
      handleGameOver(null, 'timeout', 'Computer');
    }
  };

  const handleComputerTimeout = () => {
    if (handleGameOver) {
      handleGameOver(null, 'timeout', 'User');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <PlayerCard
          name={`Bot (${elo})`}
          icon="fa-chess"
          showTimer={timeControl && timeControl.minutes > 0}
          initialTime={timeControl?.minutes * 60 || 600}
          increment={timeControl?.increment || 0}
          isActive={!isUserTurn}
          onTimeOut={handleComputerTimeout}
        />
        <GameBoard
          handleGameOver={handleGameOver}
          fen={initialFen}
          elo={elo}
          config={playEngineConfigs}
          thinkTime={2000}
        />
        <PlayerCard
          name="You"
          icon="fa-user"
          showTimer={timeControl && timeControl.minutes > 0}
          initialTime={timeControl?.minutes * 60 || 600}
          increment={timeControl?.increment || 0}
          isActive={isUserTurn}
          onTimeOut={handleUserTimeout}
        />
      </div>
      <GameSheet history={history} initialFen={initialFen} />
    </>
  );
};

export default PlayLayout;
