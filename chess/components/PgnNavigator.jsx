import { parsePgnHeaders } from '@chess/functions';
import { Button } from '@components';
import { isEmpty } from 'lodash';

const PgnNavigator = ({ games, currentIndex, onGameSelect }) => {
  if (isEmpty(games)) return null;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === games.length - 1;

  // Parse headers from current game
  const headers = parsePgnHeaders(games[currentIndex]);

  return (
    <div className="flex flex-col items-center gap-2 mb-2">
      <div className="text-center">
        <div className="text-sm font-medium text-gray-700">
          {headers.StudyName || 'Untitled Study'}
        </div>
        <div className="text-xs text-gray-500">{headers.ChapterName || 'Untitled Chapter'}</div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={() => onGameSelect(0)}
          disabled={isFirst}
          className="px-3 py-1 text-sm bg-secondary hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed rounded"
          title="First game"
        >
          First
        </Button>
        <Button
          onClick={() => onGameSelect(Math.max(0, currentIndex - 1))}
          disabled={isFirst}
          className="p-1 px-2 bg-secondary hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed rounded"
          title="Previous game"
        >
          <i className="fas fa-chevron-left" />
        </Button>
        <span className="px-4 text-sm font-medium">
          {currentIndex + 1} / {games.length}
        </span>
        <Button
          onClick={() => onGameSelect(Math.min(games.length - 1, currentIndex + 1))}
          disabled={isLast}
          className="p-1 px-2 bg-secondary hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed rounded"
          title="Next game"
        >
          <i className="fas fa-chevron-right" />
        </Button>
        <Button
          onClick={() => onGameSelect(games.length - 1)}
          disabled={isLast}
          className="px-3 py-1 text-sm bg-secondary hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed rounded"
          title="Last game"
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default PgnNavigator;
