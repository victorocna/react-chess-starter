import { PgnFileLoader } from '@chess/components';
import { DrillLayout } from '@chess/components/Drill';
import { ChessProvider, DrillProvider } from '@chess/contexts';
import { useLocalPgn } from '@chess/hooks';
import { Layout } from '@components';

const Page = () => {
  const { key, fen, pgn, setPgn } = useLocalPgn();

  return (
    <Layout key={key} title="Chess drills" button={<PgnFileLoader onPgnLoad={setPgn} />}>
      <ChessProvider fen={fen}>
        <DrillProvider mode="arrows">
          <div className="grid md:grid-cols-2 gap-12 bg-white p-6 rounded-md border">
            <DrillLayout pgn={pgn} showMoves={true} />
          </div>
        </DrillProvider>
      </ChessProvider>
    </Layout>
  );
};

export default Page;
