import { PgnEditor } from '@chess/components/PgnEditor';
import { useEqualHeight, usePgnViewer, useShapes } from '@chess/hooks';
import { NextChessground } from 'next-chessground';

const PgnEditorLayout = ({ pgn }) => {
  const {
    tree,
    setTree,
    current,
    lastMove,
    variations,
    goToMoment,
    onUserMove,
    onVariationChoice,
    onVariationsCancel,
  } = usePgnViewer(pgn);
  const { shapes, refocusModal } = useShapes({ current });
  const { sourceRef, targetRef } = useEqualHeight();

  const variationProps = {
    onChoice: onVariationChoice,
    onCancel: onVariationsCancel,
    onFocusChange: refocusModal,
  };

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
      </div>
      <div className="relative overflow-hidden">
        <div ref={targetRef} className="overflow-y-auto rounded">
          <PgnEditor
            tree={tree}
            variations={variations}
            variationProps={variationProps}
            current={current}
            onMoveClick={goToMoment}
            setTree={setTree}
          />
        </div>
      </div>
    </>
  );
};

export default PgnEditorLayout;
