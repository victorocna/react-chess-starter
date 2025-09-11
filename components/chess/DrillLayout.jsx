import { useChessContext, useDrillContext } from '@chess/contexts';
import { useMainline } from '@chess/hooks';
import { useEffect } from 'react';
import { FeedbackIcon, GameSheet } from '@chess/components';
import { DrillBoard, SwitchDrillMode } from '@chess/components/Drill';

const DrillLayout = ({ pgn, onComplete, showMoves }) => {
  const { history, initialFen, initialTurn } = useChessContext();
  const { moves } = useMainline(pgn, initialFen);

  const { feedback, lastMove, setSolution } = useDrillContext();
  useEffect(() => setSolution(moves), [moves]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <DrillBoard fen={initialFen} moves={moves} onComplete={onComplete} />
          <FeedbackIcon firstTurn={initialTurn} feedback={feedback} lastMove={lastMove} />
        </div>
        <SwitchDrillMode />
      </div>
      {showMoves && <GameSheet history={history} initialFen={initialFen} />}
    </>
  );
};

export default DrillLayout;
