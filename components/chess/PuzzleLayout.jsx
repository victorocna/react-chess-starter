import { FeedbackIcon, GameSheet, PgnNavigator } from '@chess/components';
import { PuzzleBoard } from '@chess/components/Puzzle';
import { useChessContext, usePuzzleContext } from '@chess/contexts';
import { flat } from 'chess-moments';
import { useEffect, useMemo } from 'react';

const PuzzleLayout = ({ pgn, onComplete, games, currentGameIndex, onGameSelect }) => {
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
      <div className="flex flex-col">
        <PgnNavigator games={games} currentIndex={currentGameIndex} onGameSelect={onGameSelect} />
        <GameSheet history={history} initialFen={initialFen} />
      </div>
    </>
  );
};

export default PuzzleLayout;
