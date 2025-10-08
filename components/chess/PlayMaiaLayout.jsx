import { MaiaBoard } from '@chess/components/Maia';
import { PgnTree } from '@chess/components/PgnViewer';
import { PlayerCard } from '@chess/components/Play';
import { useChessContext } from '@chess/contexts';
import { usePgnViewer } from '@chess/hooks';
import { NextChessground } from 'next-chessground';
import { useCallback, useEffect, useRef } from 'react';

const PlayMaiaLayout = ({ handleGameOver, handleGameStart, elo, timeControl }) => {
  const { history, initialFen, isUserTurn, pgn } = useChessContext();
  const maiaTimeLeft = useRef(0);

  const { tree, current, goToMoment, onUserMove: onMove, lastMoment } = usePgnViewer(pgn);

  useEffect(() => {
    if (history && history.length > 0 && handleGameStart) {
      handleGameStart();
    }
  }, [history]);

  const handleUserTimeout = () => {
    if (handleGameOver) {
      handleGameOver(null, 'timeout', 'Maia');
    }
  };

  const handleMaiaTimeout = () => {
    if (handleGameOver) {
      handleGameOver(null, 'timeout', 'User');
    }
  };

  const handleMaiaTimeUpdate = useCallback((time) => {
    maiaTimeLeft.current = time;
  }, []);

  const isReviewMode = current?.index !== lastMoment?.index && lastMoment?.index > 0;

  const initialClock = timeControl?.minutes ? timeControl.minutes * 60 : 0;

  return (
    <>
      <div className="flex flex-col gap-2">
        <PlayerCard
          name={`Maia ${elo}`}
          icon="fa-chess-knight"
          showTimer={timeControl?.minutes > 0}
          initialTime={initialClock || 600}
          increment={timeControl?.increment || 0}
          isActive={!isUserTurn}
          onTimeOut={handleMaiaTimeout}
          onTimeUpdate={handleMaiaTimeUpdate}
        />
        <div className="relative">
          <div className={isReviewMode ? 'invisible' : ''}>
            <MaiaBoard
              fen={initialFen}
              orientation="white"
              playerColor="white"
              elo={elo}
              thinkTime={1500}
              onGameOver={handleGameOver}
              onMove={onMove}
              initialClock={initialClock}
              currentClock={maiaTimeLeft?.current}
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
          showTimer={timeControl?.minutes > 0}
          initialTime={initialClock || 600}
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

export default PlayMaiaLayout;
