import { classnames } from '@lib';

const GameSheetMove = ({ isCurrent, move }) => {
  return (
    <div
      id="game-sheet-move"
      className={classnames(
        'col-span-5 flex items-center px-3 py-1 cursor-default text-gray-500 bg-secondary',
        isCurrent && 'font-bold'
      )}
    >
      <span className="font-chess">{move?.san}</span>
    </div>
  );
};

export default GameSheetMove;
