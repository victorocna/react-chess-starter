import { ChessProvider } from '@chess/contexts';
import { EloDropdown, Layout } from '@components';
import { PlayLayout } from '@components/chess';
import { toaster } from '@lib';
import { useState } from 'react';

const Page = () => {
  const [selectedElo, setSelectedElo] = useState(1200);

  const handleGameOver = (winner) => {
    toaster.success(`Game Over - ${winner} wins! 🎉`);
  };

  return (
    <Layout
      title="Play computer"
      button={<EloDropdown selectedElo={selectedElo} onEloChange={setSelectedElo} />}
    >
      <ChessProvider fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1">
        <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-md border">
          <PlayLayout botElo={selectedElo} onGameOver={handleGameOver} showMoves={true} />
        </div>
      </ChessProvider>
    </Layout>
  );
};

export default Page;
