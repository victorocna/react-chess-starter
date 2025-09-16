import { formatPvMoves } from '@chess/functions';
import { EnginePVScore } from '.';

const EnginePV = ({ position, pv = '', score }) => {
  const displayPv = formatPvMoves(position, pv);

  return (
    <div className="h-12">
      <>
        {pv ? (
          <p className="line-clamp-2">
            {score && <EnginePVScore {...score} />}
            {displayPv && <span>{displayPv}</span>}
          </p>
        ) : (
          <div className="h-4 my-1 bg-gray-400 rounded-lg w-full animate-pulse"></div>
        )}
      </>
    </div>
  );
};
export default EnginePV;
