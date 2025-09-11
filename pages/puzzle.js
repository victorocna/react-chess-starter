import { PgnFileLoader } from '@chess/components';
import { ChessProvider, PuzzleProvider } from '@chess/contexts';
import { useLocalPgn } from '@chess/hooks';
import { Layout } from '@components';
import { PuzzleLayout } from '@components/chess';
import { toaster } from '@lib';

const Page = () => {
  const { key, fen, pgn, setPgn, games, currentGameIndex, setGameIndex } = useLocalPgn();
  const handleComplete = () => {
    toaster.success('Puzzle completed successfully 🎉');
  };

  return (
    <Layout key={key} title="Chess puzzles" button={<PgnFileLoader onPgnLoad={setPgn} />}>
      <ChessProvider fen={fen}>
        <PuzzleProvider>
          <div className="grid md:grid-cols-2 gap-12 bg-white p-6 rounded-md border">
            <PuzzleLayout
              pgn={pgn}
              onComplete={handleComplete}
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
