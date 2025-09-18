import { EloDropdown } from '@chess/components';
import { ChessProvider } from '@chess/contexts';
import { Layout } from '@components';
import { PlayLayout } from '@components/chess';
import { toaster } from '@lib';
import { constants } from 'next-chessground';
import { useState } from 'react';

const Page = () => {
  const [selectedElo, setSelectedElo] = useState(1200);

  const handleGameOver = (chess) => {
    if (chess.isCheckmate()) {
      const winner = chess.turn() === 'w' ? 'Black' : 'White';
      toaster.success(`Game Over! ${winner} wins! 🎉`);
    }
  };

  return (
    <Layout title="Play computer">
      <div className="flex">
        <EloDropdown selectedElo={selectedElo} onEloChange={setSelectedElo} />
      </div>
      <ChessProvider fen={constants.initialFen}>
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 bg-white p-6 rounded-md border">
          <PlayLayout handleGameOver={handleGameOver} elo={selectedElo} />
        </div>
      </ChessProvider>
    </Layout>
  );
};

export default Page;
