import { PgnNavigator } from '@chess/components';
import { MoveModal, PgnTree } from '@chess/components/PgnViewer';
import { useEqualHeight, usePgnViewer, useShapes } from '@chess/hooks';
import { AnalysisIcon } from '@components/chess';
import { NextChessground } from 'next-chessground';

const PgnViewerLayout = ({ pgn, games, currentGameIndex, onGameSelect }) => {
  const {
    tree,
    current,
    lastMove,
    orientation,
    variations,
    goToMoment,
    onUserMove,
    onVariationChoice,
    onVariationsCancel,
  } = usePgnViewer(pgn);
  const { shapes, refocusModal } = useShapes({ current });
  const { sourceRef, targetRef } = useEqualHeight();

  return (
    <>
      <div>
        <div ref={sourceRef} className="relative w-full">
          <NextChessground
            fen={current.fen}
            orientation={orientation}
            shapes={shapes}
            lastMove={lastMove}
            onMove={onUserMove}
          />
          <AnalysisIcon
            boardOrientation={orientation}
            suffix={current?.suffix}
            lastMove={lastMove?.[1]}
          />
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

export default PgnViewerLayout;
