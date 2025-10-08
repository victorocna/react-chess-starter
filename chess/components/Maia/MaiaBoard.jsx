import { useChessContext } from '@chess/contexts';
import { parseUciMove, toUciMove } from '@chess/functions';
import { coffee } from '@functions';
import axios from 'axios';
import { NextChessground } from 'next-chessground';
import { useCallback, useEffect, useRef, useState } from 'react';

const MaiaBoard = ({
  fen,
  orientation,
  elo,
  thinkTime = 1500,
  onGameOver,
  playerColor,
  onMove,
  initialClock = 0,
  currentClock,
}) => {
  const ref = useRef();
  const isMaiaMoving = useRef(false);
  const { saveHistory } = useChessContext();
  const [moveHistory, setMoveHistory] = useState([]);

  const maiaColorCode = playerColor === 'white' ? 'b' : 'w';

  const executeBoardMove = useCallback(async (uciMove) => {
    const { from, to, promotion } = parseUciMove(uciMove);
    isMaiaMoving.current = true;
    const chess = await ref.current.board.move(from, to, promotion);
    isMaiaMoving.current = false;
    return chess;
  }, []);

  const makeMaiaMove = useCallback(
    async (currentFen, history) => {
      if (!ref.current || isMaiaMoving.current) return null;
      if (currentFen.split(' ')[1] !== maiaColorCode) return null;

      try {
        const response = await axios.post('/api/maia/get-move', {
          maiaElo: elo,
          moveHistory: history,
          initialClock,
          currentClock,
        });

        const { move, delay } = response.data;

        const totalDelay = Math.max(thinkTime, delay * 1000);
        if (totalDelay > 0) await coffee(Math.min(totalDelay, 2000));

        const chess = await executeBoardMove(move);
        if (chess) setMoveHistory((prev) => [...prev, move]);

        return chess;
      } catch (error) {
        isMaiaMoving.current = false;
        return null;
      }
    },
    [maiaColorCode, elo, initialClock, currentClock, thinkTime, executeBoardMove]
  );

  const handleMove = async (chess) => {
    if (isMaiaMoving.current) return;

    saveHistory(chess);

    const history = chess.history({ verbose: true });
    const lastMove = history[history.length - 1];
    if (lastMove) setMoveHistory((prev) => [...prev, toUciMove(lastMove)]);

    if (onMove) onMove(chess);
    if (chess.isGameOver()) {
      await onGameOver(chess);
      return;
    }

    // Maia's response
    await coffee(300);
    const updatedHistory = lastMove ? [...moveHistory, toUciMove(lastMove)] : moveHistory;
    const maiaChess = await makeMaiaMove(chess.fen(), updatedHistory);

    if (maiaChess) {
      saveHistory(maiaChess);
      if (onMove) onMove(maiaChess);
      if (maiaChess.isGameOver()) {
        await onGameOver(maiaChess);
        return;
      }
    }

    // Premove
    if (ref.current?.playPremove) {
      await coffee(100);
      await ref.current.playPremove();
    }
  };

  // Initial Maia move if starting
  useEffect(() => {
    if (fen.split(' ')[1] !== maiaColorCode || moveHistory.length > 0) return;

    (async () => {
      await coffee(500);
      const chess = await makeMaiaMove(fen, []);
      if (chess) {
        saveHistory(chess);
        if (onMove) onMove(chess);
      }
    })();
  }, [fen, maiaColorCode, moveHistory.length, makeMaiaMove, saveHistory, onMove]);

  return (
    <NextChessground premoves ref={ref} fen={fen} orientation={orientation} onMove={handleMove} />
  );
};

export default MaiaBoard;
