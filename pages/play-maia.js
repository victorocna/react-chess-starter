import { EloDropdown, TimeControlDropdown } from '@chess/components';
import { maiaEloOptions, maiaTimeControlOptions } from '@chess/constants/maia-options';
import { ChessProvider } from '@chess/contexts';
import { Layout } from '@components';
import { PlayMaiaLayout } from '@components/chess';
import { useRerender } from '@hooks';
import { toaster } from '@lib';
import { constants } from 'next-chessground';
import { useState } from 'react';

const Page = () => {
  const [selectedElo, setSelectedElo] = useState(1500);
  const [selectedTimeControl, setSelectedTimeControl] = useState('unlimited');
  const [timeControlData, setTimeControlData] = useState({
    minutes: 0,
    increment: 0,
  });
  const [gameKey, rerender] = useRerender('maia-game');
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

  const handleEloChange = (newElo) => {
    if (hasGameStarted) {
      rerender();
      setHasGameStarted(false);
    }
    setSelectedElo(newElo);
  };

  const handleTimeControlChange = (option) => {
    if (hasGameStarted) {
      rerender();
      setHasGameStarted(false);
    }
    setSelectedTimeControl(option.value);
    setTimeControlData({
      minutes: option.minutes,
      increment: option.increment,
    });
  };

  return (
    <Layout title="Play Against Maia">
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="w-full sm:w-48">
          <EloDropdown
            selectedElo={selectedElo}
            onEloChange={handleEloChange}
            options={maiaEloOptions}
            label="Opponent"
          />
        </div>
        <div className="w-full sm:w-48">
          <TimeControlDropdown
            selectedTimeControl={selectedTimeControl}
            onTimeControlChange={handleTimeControlChange}
            options={maiaTimeControlOptions}
          />
        </div>
      </div>
      <ChessProvider key={gameKey} fen={constants.initialFen}>
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 bg-white p-6 rounded-md border">
          <PlayMaiaLayout
            handleGameOver={handleGameOver}
            handleGameStart={handleGameStart}
            elo={selectedElo}
            timeControl={timeControlData}
          />
        </div>
      </ChessProvider>
    </Layout>
  );
};

export default Page;
