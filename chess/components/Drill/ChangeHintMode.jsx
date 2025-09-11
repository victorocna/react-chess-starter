import { Button } from '@components';
import { useDrillContext } from '@chess/contexts';
import { classnames } from '@lib';
import { useMemo } from 'react';

const ChangeHintMode = ({ isCompleted }) => {
  const { mode, setMode, solution } = useDrillContext();

  // Disable hint modes if the drill has no moves and is not completed
  const disabled = useMemo(() => {
    const hasNoMoves = !solution || solution.length === 0;
    return hasNoMoves || isCompleted;
  }, [isCompleted, solution]);

  return (
    <div className="hint-mode flex items-center w-full gap-2">
      <Button
        className={classnames(
          'button mini tertiary flex items-center p-2  bg-primary md:min-h-9',
          mode === 'text' && 'ring-2 ring-accent'
        )}
        onClick={() => setMode('text')}
      >
        <span className="hidden md:flex items-center">
          <span className="text-xs 2xl:text-sm font-semibold mr-1.5">Learn Mode</span>
          <i className="fas fa-book hidden lg:flex" />
        </span>
        <span className="md:hidden text-xs font-semibold">Learn</span>
      </Button>
      <div className="flex flex-wrap gap-1 items-center justify-center rounded md:bg-primary md:px-2 py-0.5">
        <h3 className="hidden md:flex text-tertiary text-xs 2xl:text-sm font-semibold mr-1">
          Drill mode
        </h3>
        <Button
          className={classnames(
            'button mini tertiary flex items-center px-2 py-2',
            disabled ? 'bg-muted opacity-50 cursor-not-allowed' : 'bg-secondary',
            mode === 'arrows' && !disabled && 'ring-2 ring-accent'
          )}
          onClick={() => setMode('arrows')}
          title="Arrow hints"
          disabled={disabled}
        >
          <i className="w-4 fas fa-arrow-up" />
        </Button>
        <Button
          className={classnames(
            'button mini tertiary flex items-center px-2 py-2',
            disabled ? 'bg-muted opacity-50 cursor-not-allowed' : 'bg-secondary',
            mode === 'squares' && !disabled && 'ring-2 ring-accent'
          )}
          onClick={() => setMode('squares')}
          title="Square hints"
          disabled={disabled}
        >
          <i className="w-4 fas fa-square" />
        </Button>
        <Button
          className={classnames(
            'button mini tertiary flex items-center px-2 py-2',
            disabled ? 'bg-muted opacity-50 cursor-not-allowed' : 'bg-secondary',
            mode === 'nohint' && !disabled && 'ring-2 ring-accent'
          )}
          onClick={() => setMode('nohint')}
          title="No hints"
          disabled={disabled}
        >
          <i className="w-4 fas fa-eye-slash" />
        </Button>
      </div>
    </div>
  );
};

export default ChangeHintMode;
