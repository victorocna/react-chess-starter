import { GameBoard } from '@chess/components/Play';
import { GameSheet } from '@chess/components';
import { useChessContext } from '@chess/contexts';

const PlayLayout = ({ botElo, onGameOver, showMoves = true }) => {
  const { history, initialFen } = useChessContext();

  return (
    <>
      <div className="flex flex-col gap-4">
        <GameBoard botElo={botElo} onGameOver={onGameOver} />
      </div>
      {showMoves && <GameSheet history={history} initialFen={initialFen} />}
    </>
  );
};

export default PlayLayout;
