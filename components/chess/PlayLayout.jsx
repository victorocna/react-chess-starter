import { GameBoard } from '@chess/components/Play';
import { GameSheet } from '@chess/components';
import { useChessContext } from '@chess/contexts';

const PlayLayout = ({ botElo, onGameOver }) => {
  const { history, initialFen } = useChessContext();

  return (
    <>
      <div className="flex flex-col gap-4">
        <GameBoard botElo={botElo} onGameOver={onGameOver} />
      </div>
      <GameSheet history={history} initialFen={initialFen} />
    </>
  );
};

export default PlayLayout;
