import { getMoveSuffix, showMoveIndex } from '@chess/functions/pgn-helpers';
import { classnames } from '@lib';

const Move = ({ move, fen, depth, previous, isActive, onClick }) => {
  return (
    <span
      className={classnames(
        'inline-flex items-end cursor-pointer px-0.5',
        depth === 1 && 'font-semibold',
        depth > 1 && !isActive && 'text-tertiary/60',
        isActive && 'text-white bg-accent rounded'
      )}
      onClick={onClick}
    >
      {showMoveIndex(previous, fen, depth) && <span className="mr-1">{getMoveSuffix(fen)}</span>}
      <span className="font-chess">{move}</span>
    </span>
  );
};

export default Move;
