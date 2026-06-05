import { classnames } from '@lib';

const studioBgColors = {
  '!!': 'bg-green-700',
  '!': 'bg-green-400',
  '!?': 'bg-pink-500',
  '?!': 'bg-blue-400',
  '?': 'bg-amber-500',
  '??': 'bg-red-500',
};

const leftClasses = [
  'left-0',
  'left-[12.5%]',
  'left-[25%]',
  'left-[37.5%]',
  'left-[50%]',
  'left-[62.5%]',
  'left-[75%]',
  'left-[87.5%]',
];

const bottomClasses = [
  'bottom-0',
  'bottom-[12.5%]',
  'bottom-[25%]',
  'bottom-[37.5%]',
  'bottom-[50%]',
  'bottom-[62.5%]',
  'bottom-[75%]',
  'bottom-[87.5%]',
];

const AnalysisIcon = ({ boardOrientation, suffix, lastMove }) => {
  if (!suffix || !lastMove) {
    return null;
  }

  const bgColor = studioBgColors[suffix] || 'bg-gray-500';

  let file = lastMove.charCodeAt(0) - 97;
  let rank = Number(lastMove[1]) - 1;

  if (boardOrientation === 'black') {
    file = 7 - file;
    rank = 7 - rank;
  }

  return (
    <div
      id="analysis-icon"
      className={classnames('top-right w-[14%] h-[14%]', leftClasses[file], bottomClasses[rank])}
    >
      <div
        className={classnames(
          'relative w-4 h-4 md:w-7 md:h-7 animate-feedback-in rounded-full z-100 flex items-center justify-center',
          bgColor
        )}
      >
        <span className="font-heading text-white text-xs md:text-sm font-bold">{suffix}</span>
      </div>
    </div>
  );
};

export default AnalysisIcon;
