import { useChessContext } from '@chess/contexts/ChessContext';
import { useDrillContext } from '@chess/contexts/DrillContext';
import { useMainline } from '@chess/hooks';
import { useEffect } from 'react';
import FeedbackIcon from '../Common/FeedbackIcon';
import DrillBoard from './DrillBoard';

const DrillLayout = ({ pgn, onComplete }) => {
  const { moves } = useMainline(pgn);

  const { initialFen, initialTurn } = useChessContext();
  const { feedback, lastMove, setSolution } = useDrillContext();
  useEffect(() => setSolution(moves), [moves]);

  return (
    <>
      <div className="relative w-full">
        <DrillBoard fen={initialFen} moves={moves} onComplete={onComplete} />
        <FeedbackIcon firstTurn={initialTurn} feedback={feedback} lastMove={lastMove} />
      </div>
    </>
  );
};

export default DrillLayout;
