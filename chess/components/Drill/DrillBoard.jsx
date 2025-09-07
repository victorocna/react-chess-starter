import { useChessContext, useDrillContext } from '@chess/contexts';
import { badMove, getNextMoment, getNextShape, replyMove, wasSolved } from '@chess/functions';
import { coffee } from '@functions';
import { isFunction } from 'lodash';
import { NextChessground } from 'next-chessground';
import { useMemo, useRef } from 'react';

const DrillBoard = ({ fen, moves, shapes, onComplete }) => {
  const ref = useRef();

  const { currentFen, saveHistory, isUserTurn } = useChessContext();
  const { mode, viewOnly, setViewOnly } = useDrillContext();

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

  // Shapes logic
  const drillShapes = useMemo(() => {
    if (mode === 'text' || !isUserTurn) {
      return [];
    }
    const nextMoment = getNextMoment(moves, currentFen);
    return getNextShape(nextMoment, mode);
  }, [mode, isUserTurn]);

  // Drawable chessboard prop with shapes that do not dissapear on user interaction
  const drawable = { enabled: false, visible: true, autoShapes: drillShapes };

  return (
    <NextChessground
      ref={ref}
      fen={fen}
      viewOnly={viewOnly}
      onMove={handleMove}
      drawable={drawable}
      shapes={shapes}
    />
  );
};

export default DrillBoard;
