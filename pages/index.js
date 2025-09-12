import { PgnFileLoader, PgnNavigator } from '@chess/components';
import { useLocalPgn } from '@chess/hooks';
import { Layout } from '@components';
import NextChessground from 'next-chessground';

const Page = () => {
  const { key, fen, setPgn, games, currentGameIndex, setGameIndex } = useLocalPgn();

  return (
    <Layout key={key} title="Basic chess board" button={<PgnFileLoader onPgnLoad={setPgn} />}>
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 bg-white p-6 rounded-md border">
        <NextChessground fen={fen} />
        <div className="flex flex-col">
          <PgnNavigator games={games} currentIndex={currentGameIndex} onGameSelect={setGameIndex} />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
