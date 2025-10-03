import { GameBoard, PlayerCard } from '@chess/components/Play';
import { PgnTree } from '@chess/components/PgnViewer';
import { useChessContext } from '@chess/contexts';
import { usePgnViewer } from '@chess/hooks';
import { playEngineConfigs } from '@chess/constants/engine-configs';
import { NextChessground } from 'next-chessground';
import { useEffect } from 'react';

const PlayLayout = ({ handleGameOver, handleGameStart, elo, timeControl }) => {
  const { history, initialFen, isUserTurn, pgn } = useChessContext();

  const { tree, current, goToMoment, onUserMove: onMove, lastMoment } = usePgnViewer(pgn);

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

  const isReviewMode = current?.index !== lastMoment?.index && lastMoment?.index > 0;

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
        <div className="relative">
          <div className={isReviewMode ? 'invisible' : ''}>
            <GameBoard
              handleGameOver={handleGameOver}
              fen={initialFen}
              elo={elo}
              config={playEngineConfigs}
              thinkTime={2000}
              onMove={onMove}
            />
          </div>
          {isReviewMode && (
            <div className="absolute inset-0">
              <NextChessground
                fen={current.fen}
                lastMove={current?.from && current?.to ? [current.from, current.to] : null}
                orientation="white"
                viewOnly={true}
              />
            </div>
          )}
        </div>
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
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto min-h-0">
          <PgnTree tree={tree} autoScroll={false} current={current} onMoveClick={goToMoment} />
        </div>
      </div>
    </>
  );
};

export default PlayLayout;
