import { parseFen } from '@chess/functions/fen-helpers';

const EmptyGameSheet = ({ initialFen }) => {
  const fenParts = parseFen(initialFen);
  const { fullmoveNumber, activeColor } = fenParts || {};

  return (
    <div className="w-full grid grid-cols-12">
      <div className="col-span-2 flex items-center justify-center bg-primary text-gray-500 py-1">
        <p>{fullmoveNumber}.</p>
      </div>
      {activeColor === 'b' && (
        <div className="col-span-5 flex items-center px-3 py-1 cursor-default text-gray-500">
          ...
        </div>
      )}
    </div>
  );
};

export default EmptyGameSheet;
