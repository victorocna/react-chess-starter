import { useMemo } from 'react';
import { NextChessground } from 'next-chessground';
import { getPositionAfterMoves } from '@chess/functions';

const EnginePVPreview = ({ startPosition, pv, moveIndex, position }) => {
  const { fen, lastMove } = useMemo(() => {
    const result = getPositionAfterMoves(startPosition, pv, moveIndex);
    return {
      fen: result.fen,
      lastMove: result.from && result.to ? [result.from, result.to] : undefined,
    };
  }, [startPosition, pv, moveIndex]);

  return (
    <div
      className="fixed z-[9999] pointer-events-none"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="w-64 h-64 shadow-lg rounded-lg overflow-hidden bg-primary">
        <NextChessground fen={fen} lastMove={lastMove} readOnly={true} orientation="white" />
      </div>
    </div>
  );
};

export default EnginePVPreview;
