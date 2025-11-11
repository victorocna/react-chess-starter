import { PgnNavigator } from '@chess/components';
import { MoveModal, PgnTree } from '@chess/components/PgnViewer';
import { Analysis, EngineSettings } from '@chess/components/Engine';
import { useEqualHeight, usePgnViewer, useShapes } from '@chess/hooks';
import { NextChessground } from 'next-chessground';
import { Toggle } from '@components';
import { useState } from 'react';
import { ENGINE_STORAGE_KEYS } from '@chess/constants/engine';

const AnalysisLayout = ({ pgn, games, currentGameIndex, onGameSelect }) => {
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [numLines, setNumLines] = useState(() => {
    const saved = localStorage.getItem(ENGINE_STORAGE_KEYS.numLines);
    return saved ? parseInt(saved, 10) : 3;
  });
  const [memory, setMemory] = useState(() => {
    const saved = localStorage.getItem(ENGINE_STORAGE_KEYS.memory);
    return saved ? parseInt(saved, 10) : 256;
  });

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

  const { refocusModal } = useShapes({
    current,
  });
  const { sourceRef, targetRef } = useEqualHeight();

  return (
    <>
      <div>
        <div ref={sourceRef} className="relative w-full">
          <NextChessground fen={current.fen} lastMove={lastMove} onMove={onUserMove} />
        </div>
      </div>
      <div ref={targetRef} className="relative overflow-hidden flex flex-col">
        <PgnNavigator games={games} currentIndex={currentGameIndex} onGameSelect={onGameSelect} />
        <div
          id="engine-analysis-header"
          className="bg-gray-200 text-black flex items-center justify-between px-3 py-2 border-b border-gray-300 rounded-t relative"
        >
          <span className="text-black font-semibold">Engine Analysis</span>
          <div className="flex items-center gap-2">
            <Toggle
              label=""
              initialState={isAnalysisOpen}
              onToggle={setIsAnalysisOpen}
              extraClass="!w-8 !h-4 after:!h-3 after:!w-3 after:!top-[2px] after:!start-[2px] peer-checked:after:!translate-x-4"
            />
            <EngineSettings
              numLines={numLines}
              onNumLinesChange={setNumLines}
              memory={memory}
              onMemoryChange={setMemory}
            />
          </div>
        </div>
        <Analysis
          current={current}
          isAnalysisOpen={isAnalysisOpen}
          numLines={numLines}
          memory={memory}
        />
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

export default AnalysisLayout;
