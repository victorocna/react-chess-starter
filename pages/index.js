import { PgnFileLoader } from '@chess/components';
import { useLocalPgn } from '@chess/hooks';
import { Layout } from '@components';
import NextChessground from 'next-chessground';

const Page = () => {
  const { key, fen, setPgn } = useLocalPgn();

  return (
    <Layout key={key} title="Basic chess board" button={<PgnFileLoader onPgnLoad={setPgn} />}>
      <div className="grid md:grid-cols-2 gap-12 bg-white p-6 rounded-md border">
        <NextChessground fen={fen} />
      </div>
    </Layout>
  );
};

export default Page;
