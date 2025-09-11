import { PgnFileLoader } from '@chess/components';
import { ChessProvider, PuzzleProvider } from '@chess/contexts';
import { useLocalPgn } from '@chess/hooks';
import { Layout } from '@components';
import { PgnEditorLayout } from '@components/chess';

const Page = () => {
  const { pgn, key, fen, setPgn, games, currentGameIndex, setGameIndex } = useLocalPgn();

  return (
    <Layout key={key} title="PGN Editor" button={<PgnFileLoader onPgnLoad={setPgn} />}>
      <ChessProvider fen={fen}>
        <PuzzleProvider>
          <div className="grid md:grid-cols-2 gap-12 bg-white p-6 rounded-md border">
            <PgnEditorLayout
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
