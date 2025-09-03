import { useChessContext } from '@chess/contexts/ChessContext';
import { usePuzzleContext } from '@chess/contexts/PuzzleContext';
import useMainline from '@chess/hooks/use-mainline';
import { useEffect } from 'react';
import FeedbackIcon from '../Common/FeedbackIcon';
import PuzzleBoard from './PuzzleBoard';

const PuzzleLayout = ({ pgn, onComplete }) => {
  const { moves } = useMainline(pgn);

  const { initialFen, initialTurn } = useChessContext();
  const { feedback, lastMove, setSolution } = usePuzzleContext();
  useEffect(() => setSolution(moves), [moves]);

  return (
    <>
      <div className="relative w-full">
        <PuzzleBoard fen={initialFen} moves={moves} onComplete={onComplete} />
        <FeedbackIcon firstTurn={initialTurn} feedback={feedback} lastMove={lastMove} />
      </div>
    </>
  );
};

export default PuzzleLayout;
