import { getMoveNumber, isMoveActive } from '@chess/functions';
import { classnames } from '@lib';
import { isFunction, last, omit } from 'lodash';
import { Fragment, useEffect, useMemo, useRef } from 'react';
import { Comment, Move, Shape } from '../PgnViewer';

const PgnTree = ({ tree, current, onMoveClick, onRightClick }) => {
  const containerRef = useRef();
  const momentsDictionaryRef = useRef({});

  // Last moment from tree
  const lastMoment = useMemo(() => last(last(tree)), [tree]);

  useEffect(() => {
    if (containerRef.current && current.index) {
      const childEl = momentsDictionaryRef.current[current.index];
      if (childEl) {
        childEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [current.index]);

  const showMomentAsGrid = (moment, inBlockIndex, block) => {
    const { move, fen, index, shapes, comment, suffix } = moment;
    let { previous } = moment;
    if (!previous) {
      previous = block[inBlockIndex - 1];
    }
    const isActive = isMoveActive(current, moment);
    const isWhiteMove = fen?.split(' ')[1] === 'b';
    const shouldShowAddOn =
      (isWhiteMove && (comment || !block[inBlockIndex + 1])) ||
      (!isWhiteMove && (!previous?.move || previous?.comment));
    const shouldShowMoveNumber = move && (isWhiteMove || shouldShowAddOn);

    // Handle optional right-click event
    const handleRightClick = (event) => {
      if (isFunction(onRightClick)) {
        onRightClick(event, moment);
      }
    };

    return (
      <Fragment key={`${move}-${fen}-${index}`}>
        {move && (
          <>
            {shouldShowMoveNumber && (
              <div className="col-span-2 flex items-center justify-center bg-primary border-gray-600">
                <p>{getMoveNumber(fen)}.</p>
              </div>
            )}
            {!isWhiteMove && shouldShowAddOn && (
              <div className="col-span-5 flex items-center px-3 py-1 bg-secondary">
                <p>...</p>
              </div>
            )}
            <div
              ref={(el) => (momentsDictionaryRef.current[moment.index] = el)}
              className={classnames(
                'col-span-5 flex items-center px-3 py-1 cursor-pointer hover:bg-accent hover:text-white',
                isActive ? 'bg-accent text-white font-bold' : 'bg-secondary'
              )}
              onClick={() => onMoveClick(moment)}
              onContextMenu={handleRightClick}
            >
              <span className="font-chess">{move}</span>
              {suffix && <span className="ml-1 font-bold text-green-500">{suffix}</span>}
              {shapes && <Shape extraClass="ml-2" />}
            </div>
            {isWhiteMove && shouldShowAddOn && moment.fen !== lastMoment.fen && (
              <div className="col-span-5 flex items-center px-3 py-1 bg-secondary">
                <p>...</p>
              </div>
            )}
          </>
        )}
        {comment && (
          <div className="col-span-12 my-2 px-2">
            {showMomentAsBlock(omit(moment, ['move']), inBlockIndex, block)}
          </div>
        )}
      </Fragment>
    );
  };

  const showMomentAsBlock = (moment, inBlockIndex, block) => {
    const { comment, move, fen, shapes, index, suffix } = moment;
    let { previous } = moment;
    if (!previous) {
      previous = block[inBlockIndex - 1];
    }
    const isActive = isMoveActive(current, moment);

    // Handle optional right-click event
    const handleRightClick = (event) => {
      if (isFunction(onRightClick)) {
        onRightClick(event, moment);
      }
    };

    return (
      <Fragment key={`${move}-${fen}-${index}`}>
        {move && (
          <div
            ref={(el) => (momentsDictionaryRef.current[moment.index] = el)}
            className="inline"
            onClick={() => onMoveClick(moment)}
            onContextMenu={handleRightClick}
          >
            <Move isActive={isActive} previous={previous} suffix={suffix} {...moment} />
          </div>
        )}
        {shapes && <Shape />}
        {comment && <Comment comment={comment} />}
      </Fragment>
    );
  };

  const showBlock = (block = [], index, array) => {
    if (!block.length) {
      return null;
    }
    if (index) {
      block[0].previous = array[index - 1][array[index - 1].length - 1];
    }
    const isLowestDepth = block[0].depth === 1;
    const spacing = `${(block[0].depth - 1) * 0.75}rem`;

    return (
      <>
        {isLowestDepth ? (
          <div key={index} className="w-full grid grid-cols-12">
            {block.map(showMomentAsGrid)}
          </div>
        ) : (
          <div
            key={index}
            className="flex flex-wrap items-start gap-1 py-1"
            style={{ marginLeft: spacing }}
          >
            {block.map(showMomentAsBlock)}
          </div>
        )}
      </>
    );
  };

  return (
    <div
      ref={containerRef}
      id="pgn-tree"
      className="flex-1 overflow-y-auto bg-secondary text-tertiary text-sm leading-relaxed min-h-0"
    >
      <div className="h-full flex flex-col">
        {tree.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center p-4">
            <p>No moves to display yet</p>
          </div>
        ) : (
          tree.map(showBlock)
        )}
      </div>
    </div>
  );
};

export default PgnTree;
