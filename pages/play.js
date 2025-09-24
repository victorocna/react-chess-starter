import { EloDropdown, TimeControlDropdown } from '@chess/components';
import { ChessProvider } from '@chess/contexts';
import { Layout } from '@components';
import { PlayLayout } from '@components/chess';
import { toaster } from '@lib';
import { constants } from 'next-chessground';
import { useState, useEffect } from 'react';
import useRerender from '@hooks/use-rerender';

const Page = () => {
  const [selectedElo, setSelectedElo] = useState(1200);
  const [selectedTimeControl, setSelectedTimeControl] = useState({
    value: 'unlimited',
    minutes: 0,
    increment: 0,
    label: 'Unlimited',
  });
  const [gameKey, rerender] = useRerender('chess-game');
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const handleGameOver = (chess, gameEndType = 'checkmate', winner = null) => {
    if (gameEndType === 'timeout' && winner) {
      toaster.success(`Game Over! ${winner} wins! ⏰`);
    } else if (chess && chess.isCheckmate()) {
      const checkmateWinner = chess.turn() === 'w' ? 'Black' : 'White';
      toaster.success(`Game Over! ${checkmateWinner} wins! 🎉`);
    }
  };

  const handleGameStart = () => {
    setHasGameStarted(true);
  };

  // Watch for settings changes and reset game if it has started
  useEffect(() => {
    if (hasGameStarted) {
      rerender();
      setHasGameStarted(false);
    }
  }, [selectedElo, selectedTimeControl.value]);

  return (
    <Layout title="Play computer">
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="w-full sm:w-48">
          <EloDropdown selectedElo={selectedElo} onEloChange={setSelectedElo} />
        </div>
        <div className="w-full sm:w-48">
          <TimeControlDropdown
            selectedTimeControl={selectedTimeControl.value}
            onTimeControlChange={setSelectedTimeControl}
          />
        </div>
      </div>
      <ChessProvider key={gameKey} fen={constants.initialFen}>
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 bg-white p-6 rounded-md border">
          <PlayLayout
            handleGameOver={handleGameOver}
            handleGameStart={handleGameStart}
            elo={selectedElo}
            timeControl={selectedTimeControl}
          />
        </div>
      </ChessProvider>
    </Layout>
  );
};

export default Page;
