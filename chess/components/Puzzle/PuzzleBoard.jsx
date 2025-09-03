import { useChessContext } from '@chess/contexts/ChessContext';
import { usePuzzleContext } from '@chess/contexts/PuzzleContext';
import { badMove, replyMove, wasSolved } from '@chess/functions/puzzle-helpers';
import { coffee } from '@functions';
import { isFunction } from 'lodash';
import { NextChessground } from 'next-chessground';
import { useRef } from 'react';

const PuzzleBoard = ({ fen, moves, shapes, onComplete }) => {
  const ref = useRef();

  const { saveHistory, isUserTurn } = useChessContext();
  const { viewOnly, setViewOnly } = usePuzzleContext();

  const handleMove = async (chess) => {
    saveHistory(chess);
    await coffee(300);

    // Check if the user's move is incorrect
    const history = chess.history({ verbose: true });
    if (badMove(history, moves)) {
      await coffee(800);

      if (isFunction(ref?.current?.undo)) {
        ref.current.undo();
        return saveHistory(chess);
      }
    }

    // Check if the puzzle has been solved with this move
    if (wasSolved(history, moves)) {
      setViewOnly(true);
      if (isFunction(onComplete)) {
        return onComplete();
      }
    }

    // Check if the game ended unexpectedly
    if (chess.isGameOver()) {
      return setViewOnly(true);
    }

    if (isUserTurn) {
      await handleOpponentMove(chess);
    }
  };

  // Make the opponent's move
  const handleOpponentMove = async (chess) => {
    await coffee(800);

    const history = chess.history({ verbose: true });
    const nextMove = replyMove(history, moves);
    if (nextMove && isFunction(ref?.current?.move)) {
      ref.current.move(nextMove?.from, nextMove?.to);
      saveHistory(chess);
    }
  };

  return (
    <NextChessground
      ref={ref}
      fen={fen}
      viewOnly={viewOnly}
      onMove={handleMove}
      drawable={false}
      shapes={shapes}
    />
  );
};

export default PuzzleBoard;
