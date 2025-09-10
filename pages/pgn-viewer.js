import { PgnFileLoader } from '@chess/components';
import { ChessProvider, PuzzleProvider } from '@chess/contexts';
import { useLocalPgn } from '@chess/hooks';
import { Layout } from '@components';
import { PgnViewerLayout } from '@components/chess';

const Page = () => {
  const { key, fen, pgn, setPgn } = useLocalPgn();

  return (
    <Layout key={key} title="PGN viewer" button={<PgnFileLoader onPgnLoad={setPgn} />}>
      <ChessProvider fen={fen}>
        <PuzzleProvider>
          <div className="grid md:grid-cols-2 gap-12 bg-white p-6 rounded-md border">
            <PgnViewerLayout pgn={pgn} />
          </div>
        </PuzzleProvider>
      </ChessProvider>
    </Layout>
  );
};

export default Page;
