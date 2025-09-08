import { useEqualHeight, usePgnViewer, useShapes } from '@chess/hooks';
import { NextChessground } from 'next-chessground';
import { Editor } from '.';

const PgnEditorLayout = ({ pgn }) => {
  const { tree, current, lastMove, goToMoment, onUserMove, setTree } = usePgnViewer(pgn);
  const { shapes } = useShapes({ current });
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
      </div>
      <div className="relative overflow-hidden">
        <div ref={targetRef} className="overflow-y-auto rounded">
          <Editor tree={tree} current={current} onMoveClick={goToMoment} setTree={setTree} />
        </div>
      </div>
    </>
  );
};

export default PgnEditorLayout;
