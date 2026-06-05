import { getMoveSuffix, nagToSymbol, showMoveIndex } from '@chess/functions';
import { classnames } from '@lib';

const Move = ({
  move,
  suffix,
  glyph,
  fen,
  depth,
  previous,
  isActive,
  onClick,
  annotationColor,
}) => {
  return (
    <span
      id="pgn-move"
      className={classnames(
        'inline-move inline-flex items-baseline cursor-pointer px-0.5 rounded',
        depth === 1 && 'font-semibold',
        depth === 1 && !isActive && 'text-tertiary',
        depth > 1 && !isActive && 'text-tertiary/60',
        isActive && 'inline-move-active text-white bg-accent hover:bg-accent',
        !isActive && annotationColor
      )}
      onClick={onClick}
    >
      {showMoveIndex(previous, fen, depth) && (
        <span className="mr-1 text-tertiary/60 text-xs">{getMoveSuffix(fen)}</span>
      )}
      <span className="font-chess">{move}</span>
      {suffix && (
        <span className={classnames('ml-1 font-bold', annotationColor || 'text-green-500')}>
          {suffix}
        </span>
      )}
      {glyph && (
        <span className={classnames('ml-1 font-bold', annotationColor || 'text-green-500')}>
          {nagToSymbol(glyph)}
        </span>
      )}
    </span>
  );
};

export default Move;
