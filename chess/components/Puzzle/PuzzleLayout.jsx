import { useChessContext, usePuzzleContext } from '@chess/contexts';
import useMainline from '@chess/hooks/use-mainline';
import { useEffect } from 'react';
import FeedbackIcon from '../FeedbackIcon';
import MoveList from '../MoveList';
import PuzzleBoard from './PuzzleBoard';

const PuzzleLayout = ({ pgn, onComplete, showMoves }) => {
  const { moves } = useMainline(pgn);

  const { history, initialFen, initialTurn } = useChessContext();
  const { feedback, lastMove, setSolution } = usePuzzleContext();
  useEffect(() => setSolution(moves), [moves]);

  return (
    <>
      <div className="relative w-full">
        <PuzzleBoard fen={initialFen} moves={moves} onComplete={onComplete} />
        <FeedbackIcon firstTurn={initialTurn} feedback={feedback} lastMove={lastMove} />
      </div>
      {showMoves && <MoveList history={history} initialFen={initialFen} />}
    </>
  );
};

export default PuzzleLayout;
