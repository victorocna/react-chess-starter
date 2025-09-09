import { PgnFileLoader } from '@chess/components';
import { PgnEditorLayout } from '@chess/components/PgnEditor';
import { ChessProvider, PuzzleProvider } from '@chess/contexts';
import { useLocalPgn } from '@chess/hooks';
import { Layout } from '@components';

const Page = () => {
  const { pgn, key, fen, setPgn } = useLocalPgn();

  return (
    <Layout key={key} title="PGN Editor" button={<PgnFileLoader onPgnLoad={setPgn} />}>
      <ChessProvider fen={fen}>
        <PuzzleProvider>
          <div className="grid md:grid-cols-2 gap-12 bg-white p-6 rounded-md border">
            <PgnEditorLayout pgn={pgn} />
          </div>
        </PuzzleProvider>
      </ChessProvider>
    </Layout>
  );
};

export default Page;
