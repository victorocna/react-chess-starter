import { useChessContext } from '@chess/contexts';
import { engineMove } from '@chess/functions';
import { isFunction } from 'lodash';
import { NextChessground } from 'next-chessground';
import { useRef } from 'react';

const ChessBoard = ({ fen, orientation, engine, onGameOver }) => {
  const ref = useRef();
  const { saveHistory } = useChessContext();

  // Make the engine move on the chess board
  const makeEngineMove = async (fen) => {
    if (!engine || !ref.current) return;

    await engine.set_position(fen);
    const thinkTime = 1000; // 1 second think time
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
    if (chess.isGameOver()) {
      await onGameOver(chess);
      return engine.quit();
    }
  };

  return <NextChessground ref={ref} fen={fen} orientation={orientation} onMove={handleMove} />;
};

export default ChessBoard;
