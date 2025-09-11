import { useChessContext, useDrillContext } from '@chess/contexts';
import { useMainline } from '@chess/hooks';
import { useEffect, useState } from 'react';
import { FeedbackIcon, GameSheet } from '@chess/components';
import { DrillBoard, ChangeHintMode } from '@chess/components/Drill';

const DrillLayout = ({ pgn, onComplete, showMoves }) => {
  const { history, initialFen, initialTurn } = useChessContext();
  const { moves } = useMainline(pgn, initialFen);
  const [isCompleted, setIsCompleted] = useState(false);

  const { feedback, lastMove, setSolution } = useDrillContext();
  useEffect(() => setSolution(moves), [moves]);

  const handleComplete = () => {
    setIsCompleted(true);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <DrillBoard fen={initialFen} moves={moves} onComplete={handleComplete} />
          <FeedbackIcon firstTurn={initialTurn} feedback={feedback} lastMove={lastMove} />
        </div>
        <ChangeHintMode isCompleted={isCompleted} />
      </div>
      {showMoves && <GameSheet history={history} initialFen={initialFen} />}
    </>
  );
};

export default DrillLayout;
