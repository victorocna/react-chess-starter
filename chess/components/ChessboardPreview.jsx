import { NextChessground } from 'next-chessground';

const ChessBoardPreview = ({ fen, size = 120 }) => {
  return (
    <div
      className="chess-board-preview border border-white/20 rounded overflow-hidden"
      style={{ width: size, height: size }}
    >
      <NextChessground
        fen={fen}
        viewOnly={true}
        coordinates={false}
        resizable={false}
        width={size}
        height={size}
      />
    </div>
  );
};

export default ChessBoardPreview;
