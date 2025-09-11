import { FeedbackIcon, GameSheet } from '@chess/components';
import { PuzzleBoard } from '@chess/components/Puzzle';
import { useChessContext, usePuzzleContext } from '@chess/contexts';
import { flat } from 'chess-moments';
import { useEffect, useMemo } from 'react';

const PuzzleLayout = ({ pgn, onComplete }) => {
  const moves = useMemo(() => flat(pgn), [pgn]);

  const { history, initialFen, initialTurn } = useChessContext();
  const { feedback, lastMove, setSolution } = usePuzzleContext();
  useEffect(() => setSolution(moves), [moves]);

  return (
    <>
      <div className="relative w-full">
        <PuzzleBoard fen={initialFen} moves={moves} onComplete={onComplete} />
        <FeedbackIcon firstTurn={initialTurn} feedback={feedback} lastMove={lastMove} />
      </div>
      <GameSheet history={history} initialFen={initialFen} />
    </>
  );
};

export default PuzzleLayout;
