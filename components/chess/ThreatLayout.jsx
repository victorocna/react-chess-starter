import { PgnNavigator, ThreatButton } from '@chess/components';
import { MoveModal, PgnTree } from '@chess/components/PgnViewer';
import { useEqualHeight, usePgnViewer, useShapes, useThreat } from '@chess/hooks';
import { NextChessground } from 'next-chessground';
import { useEffect } from 'react';

const ThreatLayout = ({ pgn, games, currentGameIndex, onGameSelect }) => {
  const {
    tree,
    current,
    lastMove,
    variations,
    goToMoment,
    onUserMove,
    onVariationChoice,
    onVariationsCancel,
  } = usePgnViewer(pgn);

  const { threatShape, isThreatActive, setThreatFen, toggleThreat } = useThreat(current.fen);

  // Update threat FEN when the current FEN changes
  useEffect(() => {
    setThreatFen(current.fen);
  }, [current.fen, setThreatFen]);

  const { shapes, refocusModal } = useShapes({
    current,
    threatShape,
  });
  const { sourceRef, targetRef } = useEqualHeight();

  return (
    <>
      <div>
        <div ref={sourceRef} className="relative w-full">
          <NextChessground
            fen={current.fen}
            shapes={shapes}
            lastMove={lastMove}
            onMove={onUserMove}
          />
        </div>
        <div className="mt-4">
          <ThreatButton isThreatActive={isThreatActive} onToggleThreat={toggleThreat} />
        </div>
      </div>
      <div ref={targetRef} className="relative overflow-hidden flex flex-col">
        <PgnNavigator games={games} currentIndex={currentGameIndex} onGameSelect={onGameSelect} />
        <div className="overflow-y-auto rounded">
          <PgnTree tree={tree} current={current} onMoveClick={goToMoment} />
        </div>
        {variations && (
          <div
            className="absolute top-0 left-0 w-full h-full bg-tertiary/50
          backdrop-blur-sm flex items-center justify-center z-50"
          >
            <MoveModal
              variations={variations}
              onChoice={onVariationChoice}
              onCancel={onVariationsCancel}
              onFocusChange={refocusModal}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ThreatLayout;
