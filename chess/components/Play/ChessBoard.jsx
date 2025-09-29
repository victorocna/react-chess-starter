import { useChessContext } from '@chess/contexts';
import { engineMove } from '@chess/functions';
import { coffee } from '@functions';
import { isFunction } from 'lodash';
import { NextChessground } from 'next-chessground';
import { useEffect, useRef } from 'react';

const ChessBoard = ({ fen, orientation, engine, thinkTime, onGameOver, playerColor }) => {
  const ref = useRef();
  const { saveHistory } = useChessContext();

  // Set custom starting position if specified
  useEffect(() => {
    engine.set_position(fen);
  }, [engine, fen]);

  // Make the engine move on the chess board
  const makeEngineMove = async (fen) => {
    if (!engine || !ref.current) return;

    await engine.set_position(fen);
    const nextMove = engineMove(await engine.go_time(thinkTime));

    if (nextMove && isFunction(ref?.current?.board?.move)) {
      ref.current.board.move(nextMove.from, nextMove.to);
    }
  };

  // Handles both user moves and engine moves
  const handleMove = async (chess) => {
    engine.toggleTurn();
    saveHistory(chess);
    if (engine.turn) {
      await makeEngineMove(chess.fen());
    }
    // Execute premove if available
    if (ref.current && ref.current.playPremove) {
      await coffee(100);
      await ref.current.playPremove();
    }

    if (chess.isGameOver()) {
      await onGameOver(chess);
      return engine.quit();
    }
  };

  // Handle initial engine move if engine should start first
  useEffect(() => {
    if (engine.shouldMoveFirst(fen, playerColor)) {
      engine.toggleTurn();
      makeEngineMove(fen);
    }
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
