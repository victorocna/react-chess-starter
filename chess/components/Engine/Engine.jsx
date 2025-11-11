import { useEffect, useRef, useState } from 'react';
import { useEngine, usePreviewPosition } from '@chess/hooks';
import { useDebounce } from '@hooks';
import { classnames } from '@lib';
import { EngineProgressBar, EnginePV, EnginePVPreview } from '.';

const Engine = ({ fen, numLines, memory }) => {
  const engine = useEngine();
  const [lines, setLines] = useState([]);
  const [sharedNodes, setSharedNodes] = useState(0);
  const { hoveredMove, previewPosition, containerRef, handleMoveHover } = usePreviewPosition(lines);
  const isMountedRef = useRef(true);
  const isAnalyzingRef = useRef(false);

  // Debounce the FEN to avoid thrashing the engine
  const debouncedFen = useDebounce(fen, 150);

  const sendPositionToEngine = async (fen) => {
    if (!isMountedRef.current) return;

    try {
      // Stop any ongoing analysis
      if (isAnalyzingRef.current) {
        await engine.stop();
        isAnalyzingRef.current = false;
      }

      await engine.is_ready();
      engine.set_hash(memory);
      engine.set_multipv(numLines);
      engine.set_position(fen);

      isAnalyzingRef.current = true;
      engine.go_infinite((info) => {
        if (!isMountedRef.current) return;

        // Update shared node count for all lines
        if (info.nodes) {
          setSharedNodes(info.nodes);
        }

        if (info.multipv) {
          setLines((prevLines) => {
            const newLines = [...prevLines];
            const lineIndex = info.multipv - 1;
            newLines[lineIndex] = info;
            return newLines;
          });
        }
      });
    } catch (error) {
      console.error('Engine analysis error:', error);
      isAnalyzingRef.current = false;
    }
  };

  // Reset lines and nodes immediately when FEN changes (before debounce)
  useEffect(() => {
    setLines([]);
    setSharedNodes(0);
  }, [fen]);

  // Send position to engine after debounce
  useEffect(() => {
    sendPositionToEngine(debouncedFen);
  }, [debouncedFen, numLines, memory]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      // Stop analysis when component unmounts
      if (isAnalyzingRef.current && engine) {
        engine.stop().catch(() => {
          // Ignore errors on cleanup
        });
        isAnalyzingRef.current = false;
      }
    };
  }, [engine]);

  return (
    <div className="text-sm relative">
      <EngineProgressBar nodes={sharedNodes} />
      <div
        ref={containerRef}
        className={classnames('', sharedNodes > 0 && 'pt-0.5')}
        onMouseLeave={() => handleMoveHover(null)}
      >
        {Array.from({ length: numLines }).map((_, index) => (
          <EnginePV
            key={index}
            position={fen}
            lineNumber={index + 1}
            {...lines[index]}
            nodes={sharedNodes}
            onMoveHover={handleMoveHover}
          />
        ))}
      </div>
      {hoveredMove && previewPosition && (
        <EnginePVPreview
          startPosition={fen}
          pv={hoveredMove.pv}
          moveIndex={hoveredMove.moveIndex}
          position={previewPosition}
        />
      )}
    </div>
  );
};

export default Engine;
