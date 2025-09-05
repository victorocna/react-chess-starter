import { useChessContext, useDrillContext } from '@chess/contexts';
import { useMainline } from '@chess/hooks';
import { useEffect } from 'react';
import FeedbackIcon from '../FeedbackIcon';
import MoveList from '../MoveList';
import DrillBoard from './DrillBoard';

const DrillLayout = ({ pgn, onComplete, showMoves }) => {
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
      {showMoves && <MoveList history={history} initialFen={initialFen} />}
    </>
  );
};

export default DrillLayout;
