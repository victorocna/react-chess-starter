import { getMoveSuffix, showMoveIndex } from '@chess/functions';
import { classnames } from '@lib';

const Move = ({ move, suffix, fen, depth, previous, isActive, onClick }) => {
  return (
    <span
      className={classnames(
        'inline-move inline-flex items-end cursor-pointer px-0.5 rounded',
        depth === 1 && 'font-semibold',
        depth > 1 && !isActive && 'text-tertiary/60',
        isActive && 'inline-move-active text-white bg-accent hover:bg-accent'
      )}
      onClick={onClick}
    >
      {showMoveIndex(previous, fen, depth) && <span className="mr-1">{getMoveSuffix(fen)}</span>}
      <span className="font-chess">{move}</span>
      {suffix && <span className="ml-1 font-bold text-green-500">{suffix}</span>}
    </span>
  );
};

export default Move;
