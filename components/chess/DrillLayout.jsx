import { FeedbackIcon, GameSheet } from '@chess/components';
import { DrillBoard } from '@chess/components/Drill';
import { useChessContext, useDrillContext } from '@chess/contexts';
import { useMainline } from '@chess/hooks';
import { useEffect } from 'react';

const DrillLayout = ({ pgn, onComplete }) => {
  const { history, initialFen, initialTurn } = useChessContext();
  const { moves } = useMainline(pgn, initialFen);

  const { feedback, lastMove, setSolution } = useDrillContext();
  useEffect(() => setSolution(moves), [moves]);

  return (
    <>
      <div className="relative w-full">
        <DrillBoard fen={initialFen} moves={moves} onComplete={onComplete} />
        <FeedbackIcon firstTurn={initialTurn} feedback={feedback} lastMove={lastMove} />
      </div>
      <GameSheet history={history} initialFen={initialFen} />
    </>
  );
};

export default DrillLayout;
