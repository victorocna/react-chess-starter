import { buildPgnMobileStrip } from '@chess/functions';
import { Button } from '@components';
import { classnames } from '@lib';
import { useEffect, useMemo, useRef } from 'react';
import PgnTreeMobileItem from './PgnTreeMobileItem';

const PgnTreeMobile = ({
  canGoNext,
  canGoPrev,
  current,
  mainlineMoments = [],
  onMoveClick,
  onNextMove,
  onPrevMove,
}) => {
  const activeRef = useRef(null);
  const stripItems = useMemo(
    () => buildPgnMobileStrip(mainlineMoments, current),
    [current, mainlineMoments]
  );

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [current?.fen, current?.move, current?.depth, stripItems.length]);

  return (
    <div
      className={classnames(
        'flex items-center gap-1 py-0 md:hidden',
        stripItems.length === 0 ? 'hidden' : ''
      )}
      aria-label="Main line moves"
    >
      <Button
        aria-label="Previous move"
        disabled={!canGoPrev}
        onClick={onPrevMove}
        className={classnames(
          'flex h-8 w-8 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-tertiary shadow-none transition-colors',
          canGoPrev ? 'hover:text-accent active:opacity-70' : 'cursor-not-allowed opacity-40'
        )}
      >
        <i className="fas fa-chevron-left text-sm" />
      </Button>
      <div className="flex min-w-0 flex-1 items-center overflow-x-auto py-0">
        <div className="flex flex-nowrap items-baseline gap-x-1 whitespace-nowrap">
          {stripItems.map((item) => (
            <PgnTreeMobileItem
              activeRef={activeRef}
              item={item}
              key={item.key}
              onMoveClick={onMoveClick}
            />
          ))}
        </div>
      </div>
      <Button
        aria-label="Next move"
        disabled={!canGoNext}
        onClick={onNextMove}
        className={classnames(
          'flex h-8 w-8 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-tertiary shadow-none transition-colors',
          canGoNext ? 'hover:text-accent active:opacity-70' : 'cursor-not-allowed opacity-40'
        )}
      >
        <i className="fas fa-chevron-right text-sm" />
      </Button>
    </div>
  );
};

export default PgnTreeMobile;
