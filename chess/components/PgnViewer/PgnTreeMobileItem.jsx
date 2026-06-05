import { momentAnnotations } from '@chess/constants/moment-annotations';
import { nagToSymbol } from '@chess/functions';
import { Button } from '@components';
import { classnames } from '@lib';
import { flatMap } from 'lodash';

const studioTextColors = {
  '!!': 'text-green-700',
  '!': 'text-green-400',
  '!?': 'text-pink-500',
  '?!': 'text-blue-400',
  '?': 'text-amber-500',
  '??': 'text-red-500',
};

const glyphTitle = (glyph) => flatMap(momentAnnotations).find((item) => item.nag === glyph)?.label;

const PgnTreeMobileItem = ({ activeRef, item, onMoveClick }) => {
  if (item.type !== 'move') {
    return (
      <span
        className="inline-flex shrink-0 items-baseline py-0 text-xs font-chess leading-none text-tertiary"
        key={item.key}
      >
        {item.text}
      </span>
    );
  }

  const { active, moment, text } = item;
  const annotationColor = studioTextColors[moment.suffix] || null;

  return (
    <span className="inline-flex shrink-0" ref={active ? activeRef : undefined}>
      <Button
        className={classnames(
          'inline-flex shrink-0 items-baseline rounded-md px-2 py-0.5 text-sm transition-colors',
          active ? 'bg-accent font-semibold text-white' : 'text-tertiary hover:bg-secondary'
        )}
        key={item.key}
        onClick={() => onMoveClick(moment)}
      >
        <span className="font-chess">{text}</span>
        {moment.suffix && (
          <span
            className={classnames(
              'ml-1 font-bold',
              active ? 'text-white' : annotationColor || 'text-green-500'
            )}
          >
            {moment.suffix}
          </span>
        )}
        {moment.glyph && (
          <span
            className={classnames(
              'ml-1 font-bold',
              active ? 'text-white' : annotationColor || 'text-green-500'
            )}
            title={glyphTitle(moment.glyph)}
          >
            {nagToSymbol(moment.glyph)}
          </span>
        )}
      </Button>
    </span>
  );
};

export default PgnTreeMobileItem;
