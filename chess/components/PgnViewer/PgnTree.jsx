import { last } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
import { PgnBlock } from '.';

const PgnTree = ({
  tree,
  current,
  onMoveClick,
  onRightClick,
  autoScroll = true,
  analysis = false,
  compact = false,
}) => {
  const containerRef = useRef();
  const momentsDictionaryRef = useRef({});

  const lastMoment = useMemo(() => last(last(tree)), [tree]);

  useEffect(() => {
    if (autoScroll && containerRef.current && current?.index) {
      const childEl = momentsDictionaryRef.current[current?.index];
      if (childEl) {
        const container = containerRef.current;

        let scrollTarget = container;
        let parent = container.parentElement;

        while (parent && parent !== document.body) {
          const styles = window.getComputedStyle(parent);
          if (styles.overflowY === 'auto' || styles.overflowY === 'scroll') {
            scrollTarget = parent;
            break;
          }
          parent = parent.parentElement;
        }

        const childOffsetTop = childEl.getBoundingClientRect().top;
        const targetOffsetTop = scrollTarget.getBoundingClientRect().top;
        const relativeTop = childOffsetTop - targetOffsetTop;
        const scrollTop =
          scrollTarget.scrollTop +
          relativeTop -
          scrollTarget.clientHeight / 2 +
          childEl.clientHeight / 2;

        scrollTarget.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
        });
      }
    }
  }, [current?.index, autoScroll]);

  const registerRef = (index, el) => {
    if (el) {
      momentsDictionaryRef.current[index] = el;
    }
  };

  return (
    <div
      ref={containerRef}
      id="pgn-tree"
      className={`flex-1 bg-secondary text-tertiary text-sm leading-relaxed min-h-0${compact ? ' rounded-lg overflow-hidden' : ''}`}
    >
      <div className="h-full flex flex-col">
        {tree.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center p-4">
            <p>No moves to display yet</p>
          </div>
        ) : (
          tree.map((block, index) => (
            <PgnBlock
              key={index}
              block={block}
              index={index}
              tree={tree}
              current={current}
              onMoveClick={onMoveClick}
              onRightClick={onRightClick}
              analysis={analysis}
              lastMoment={lastMoment}
              registerRef={registerRef}
              compact={compact}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PgnTree;
