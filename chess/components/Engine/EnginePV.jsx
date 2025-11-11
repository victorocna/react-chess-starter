import { formatPvMoves } from '@chess/functions';
import { useDisclosure } from '@hooks';
import { classnames } from '@lib';
import { EnginePVScore } from '.';
import { Button } from '@components';

const EnginePV = ({ position, pv = '', score, onMoveHover }) => {
  const { isOpen: isExpanded, toggle } = useDisclosure(false);
  const formattedMoves = formatPvMoves(position, pv);

  const handleMouseEnter = (index) => {
    if (onMoveHover) {
      onMoveHover({
        pv,
        moveIndex: index,
      });
    }
  };

  return (
    <div id="engine-pv-row" className="border-b px-1 py-1 border-gray-300 bg-gray-50 relative">
      {pv ? (
        <>
          <div className="flex items-start gap-1 relative">
            <div
              className={classnames(
                'flex-1 flex items-center flex-wrap gap-0.5 pr-6 text-gray-800',
                !isExpanded && 'overflow-hidden max-h-5'
              )}
            >
              {score && <EnginePVScore {...score} />}
              {formattedMoves.map((moveObj, index) => (
                <span key={index} className="inline-flex items-center whitespace-nowrap">
                  {moveObj.showNumber && (
                    <span className="text-xs mr-0.5 text-gray-500">
                      {moveObj.moveNumber}.{!moveObj.isWhite && '..'}
                    </span>
                  )}
                  <span
                    className="relative inline-block"
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <span className="font-chess text-xs text-gray-800 px-0.5 py-0.5 hover:text-accent cursor-pointer transition-colors inline-block text-center">
                      {moveObj.move}
                    </span>
                  </span>
                </span>
              ))}
            </div>
            <Button
              onClick={toggle}
              className="absolute right-1 top-0.5 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-xs`}></i>
            </Button>
          </div>
        </>
      ) : (
        <div className="flex py-0.5 items-center flex-wrap gap-1 max-h-5">
          <div className="h-3.5 w-10 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-3.5 w-10 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-3.5 w-10 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-3.5 w-10 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-3.5 w-10 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-3.5 w-10 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-3.5 w-10 bg-gray-300 rounded animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default EnginePV;
