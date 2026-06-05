import { momentAnnotations } from '@chess/constants/moment-annotations';
import { getMoveNumber, isMoveActive, nagToSymbol } from '@chess/functions';
import { classnames } from '@lib';
import { flatMap, isFunction, last, omit } from 'lodash';
import { Fragment } from 'react';
import { Comment, Move, PgnTreeLines, Shape } from '.';

const gameReviewTextColors = {
  '!!': 'text-emerald-400',
  '!': 'text-sky-400',
  '!?': 'text-lime-400',
  '?!': 'text-yellow-500',
  '?': 'text-orange-500',
  '??': 'text-red-700',
};

const studioTextColors = {
  '!!': 'text-green-700',
  '!': 'text-green-400',
  '!?': 'text-pink-500',
  '?!': 'text-blue-400',
  '?': 'text-amber-500',
  '??': 'text-red-500',
};

const PgnBlock = ({
  block,
  index,
  tree,
  current,
  onMoveClick,
  onRightClick,
  analysis,
  lastMoment,
  registerRef,
  compact = false,
}) => {
  if (!block.length) {
    return null;
  }

  if (index) {
    block[0].previous = tree[index - 1][tree[index - 1].length - 1];
  }

  const getAnnotationColor = (suffix) => {
    if (!suffix) return null;
    const palette = analysis ? gameReviewTextColors : studioTextColors;
    return palette[suffix] || null;
  };

  const showMomentAsGrid = (moment, inBlockIndex, block, nextBlockIsLight) => {
    const { move, fen, index: momentIndex, comment, suffix, glyph, shapes } = moment;
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

    const annotationColor = getAnnotationColor(suffix);

    const handleRightClick = (event) => {
      if (isFunction(onRightClick)) {
        onRightClick(event, moment);
      }
    };

    return (
      <Fragment key={`${move}-${fen}-${momentIndex}`}>
        {move && (
          <>
            {shouldShowMoveNumber && (
              <div className="col-span-1 flex items-center justify-center bg-primary border-gray-400">
                <p className="text-tertiary text-xs">{getMoveNumber(fen)}</p>
              </div>
            )}
            {!isWhiteMove && shouldShowAddOn && (
              <div className="col-span-1 flex items-center px-3 py-1 bg-secondary">
                <p className="text-tertiary">...</p>
              </div>
            )}
            <div
              ref={(el) => registerRef(moment.index, el)}
              className={classnames(
                'col-span-1 flex items-center px-3 py-1 cursor-pointer hover:bg-accent hover:text-white text-base',
                isActive ? 'bg-accent text-white font-bold' : 'bg-secondary',
                annotationColor
              )}
              onClick={() => onMoveClick(moment)}
              onContextMenu={handleRightClick}
            >
              <span className="font-chess">{move}</span>
              {suffix && (
                <span className={classnames('ml-1 font-bold', annotationColor || 'text-green-500')}>
                  {suffix}
                </span>
              )}
              {glyph && (
                <span
                  className={classnames('ml-1 font-bold', annotationColor || 'text-green-500')}
                  title={flatMap(momentAnnotations).find((item) => item.nag === glyph)?.label}
                >
                  {nagToSymbol(glyph)}
                </span>
              )}
              {shapes?.length > 0 && <Shape />}
            </div>
            {isWhiteMove && shouldShowAddOn && moment.fen !== lastMoment?.fen && (
              <div className="col-span-1 flex items-center px-3 py-1 bg-secondary">
                <p className="text-tertiary">...</p>
              </div>
            )}
          </>
        )}
        {comment && (
          <div
            className={classnames(
              'col-span-3 font-noto px-2',
              compact
                ? 'py-1'
                : classnames(
                    'bg-primary border-gray-400 border-t border-l-2 border-l-gray-400',
                    (!block[inBlockIndex + 1] && !nextBlockIsLight) || block[inBlockIndex + 1]
                      ? 'border-b'
                      : ''
                  )
            )}
          >
            {showMomentAsBlock(omit(moment, ['move']), inBlockIndex, block)}
          </div>
        )}
      </Fragment>
    );
  };

  const showMomentAsBlock = (moment, inBlockIndex, block) => {
    const { comment, move, fen, index: momentIndex, suffix, glyph, shapes } = moment;
    let { previous } = moment;
    if (!previous) {
      previous = block[inBlockIndex - 1];
    }
    const isActive = isMoveActive(current, moment);
    const annotationColor = getAnnotationColor(suffix);

    const handleRightClick = (event) => {
      if (isFunction(onRightClick)) {
        onRightClick(event, moment);
      }
    };

    return (
      <Fragment key={`${move}-${fen}-${momentIndex}`}>
        {move && (
          <span
            ref={(el) => registerRef(moment.index, el)}
            className={classnames('inline', annotationColor)}
            onClick={() => onMoveClick(moment)}
            onContextMenu={handleRightClick}
          >
            <Move
              isActive={isActive}
              previous={previous}
              suffix={suffix}
              glyph={glyph}
              annotationColor={annotationColor}
              {...moment}
            />
            {shapes?.length > 0 && <Shape />}
            {comment && <Comment comment={comment} extraClass="font-noto" inline />}
          </span>
        )}

        {!move && comment && <Comment comment={comment} extraClass="font-noto" />}
      </Fragment>
    );
  };

  const isLowestDepth = block[0].depth === 1;
  const spacing = `${(block[0].depth - 1) * 0.75}rem`;

  const nextBlockIsLight = tree[index + 1]?.[0]?.depth > 1;

  let prevBlockIsLight = false;
  if (index > 0) {
    const prevBlock = tree[index - 1];
    prevBlockIsLight =
      prevBlock?.[0]?.depth > 1 || (prevBlock?.[0]?.depth === 1 && last(prevBlock)?.comment);
  }

  const hasTopBorder = !prevBlockIsLight;
  const hasBottomBorder = !nextBlockIsLight;

  if (isLowestDepth) {
    return (
      <div key={index} className="w-full grid grid-cols-[3.5rem_1fr_1fr]">
        {block.map((moment, i, blk) => showMomentAsGrid(moment, i, blk, nextBlockIsLight))}
      </div>
    );
  }

  return (
    <div
      key={index}
      className={classnames(
        'relative py-1 leading-relaxed bg-primary border-gray-400',
        hasTopBorder ? 'border-t' : '',
        hasBottomBorder ? 'border-b' : ''
      )}
      style={{ paddingLeft: spacing }}
    >
      <PgnTreeLines tree={tree} blockIndex={index} currentDepth={block[0].depth} />
      {block.map(showMomentAsBlock)}
    </div>
  );
};

export default PgnBlock;
