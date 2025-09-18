import { GameBoard } from '@chess/components/Play';
import { GameSheet } from '@chess/components';
import { useChessContext } from '@chess/contexts';
import { playEngineConfigs } from '@chess/constants/engine-configs';

const PlayLayout = ({ handleGameOver, elo }) => {
  const { history, initialFen } = useChessContext();

  return (
    <>
      <div className="flex flex-col gap-4">
        <GameBoard
          handleGameOver={handleGameOver}
          fen={initialFen}
          elo={elo}
          config={playEngineConfigs}
        />
      </div>
      <GameSheet history={history} initialFen={initialFen} />
    </>
  );
};

export default PlayLayout;
