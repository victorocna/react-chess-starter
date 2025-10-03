import { useChessContext } from '@chess/contexts';
import { engineMove } from '@chess/functions';
import { coffee } from '@functions';
import { isFunction } from 'lodash';
import { NextChessground } from 'next-chessground';
import { useEffect, useRef } from 'react';

const ChessBoard = ({ fen, orientation, engine, thinkTime, onGameOver, playerColor, onMove }) => {
  const ref = useRef();
  const isEngineMoving = useRef(false);
  const { saveHistory } = useChessContext();

  // Set custom starting position if specified
  useEffect(() => {
    engine.set_position(fen);
  }, [engine, fen]);

  // Make the engine move on the chess board
  const makeEngineMove = async (fen) => {
    if (!engine || !ref.current) return null;

    await engine.set_position(fen);
    const nextMove = engineMove(await engine.go_time(thinkTime));

    if (nextMove && isFunction(ref?.current?.board?.move)) {
      isEngineMoving.current = true;
      const engineChess = ref.current.board.move(nextMove.from, nextMove.to);
      isEngineMoving.current = false;
      return engineChess;
    }

    return null;
  };

  // Handles both user moves and engine moves
  const handleMove = async (chess) => {
    if (isEngineMoving.current) {
      return;
    }

    engine.toggleTurn();
    saveHistory(chess);

    if (onMove && isFunction(onMove)) {
      onMove(chess);
    }

    if (chess.isGameOver()) {
      await onGameOver(chess);
      return engine.quit();
    }

    if (engine.turn) {
      const engineChess = await makeEngineMove(chess.fen());

      if (engineChess) {
        if (onMove && isFunction(onMove)) {
          onMove(engineChess);
        }

        if (engineChess.isGameOver()) {
          saveHistory(engineChess);
          await onGameOver(engineChess);
          return engine.quit();
        }
      }
    }

    // Execute premove if available
    if (ref.current && ref.current.playPremove) {
      await coffee(100);
      await ref.current.playPremove();
    }
  };

  // Handle initial engine move if engine should start first
  useEffect(() => {
    const handleInitialMove = async () => {
      if (engine.shouldMoveFirst(fen, playerColor)) {
        engine.toggleTurn();
        const engineChess = await makeEngineMove(fen);

        if (engineChess && onMove && isFunction(onMove)) {
          onMove(engineChess);
        }
      }
    };

    handleInitialMove();
  }, [engine, fen, playerColor]);

  return (
    <NextChessground
      premoves={true}
      ref={ref}
      fen={fen}
      orientation={orientation}
      onMove={handleMove}
    />
  );
};

export default ChessBoard;
