import { PgnFileLoader } from '@chess/components';
import { ChessProvider, PuzzleProvider } from '@chess/contexts';
import { useLocalPgn } from '@chess/hooks';
import { Layout } from '@components';
import { ThreatLayout } from '@components/chess';

const Page = () => {
  const { key, fen, pgn, setPgn, games, currentGameIndex, setGameIndex } = useLocalPgn();

  return (
    <Layout key={key} title="Show threats" button={<PgnFileLoader onPgnLoad={setPgn} />}>
      <ChessProvider fen={fen}>
        <PuzzleProvider>
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 bg-white p-6 rounded-md border">
            <ThreatLayout
              pgn={pgn}
              games={games}
              currentGameIndex={currentGameIndex}
              onGameSelect={setGameIndex}
            />
          </div>
        </PuzzleProvider>
      </ChessProvider>
    </Layout>
  );
};

export default Page;
