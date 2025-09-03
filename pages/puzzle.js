import { PgnFileLoader } from '@chess/components';
import { PuzzleLayout } from '@chess/components/Puzzle';
import { ChessProvider, PuzzleProvider } from '@chess/contexts';
import { useLocalPgn } from '@chess/hooks';
import { Layout } from '@components';

const Page = () => {
  const { key, fen, pgn, setPgn } = useLocalPgn();

  return (
    <Layout key={key} title="Chess puzzles" button={<PgnFileLoader onPgnLoad={setPgn} />}>
      <ChessProvider fen={fen}>
        <PuzzleProvider>
          <div className="grid md:grid-cols-2 gap-12 bg-white p-6 rounded-md border">
            <PuzzleLayout pgn={pgn} showMoves={true} />
          </div>
        </PuzzleProvider>
      </ChessProvider>
    </Layout>
  );
};

export default Page;
