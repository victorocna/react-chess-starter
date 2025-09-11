import { PgnFileLoader } from '@chess/components';
import { useLocalPgn } from '@chess/hooks';
import { Layout } from '@components';
import NextChessground from 'next-chessground';

const Page = () => {
  const { key, fen, setPgn } = useLocalPgn();

  return (
    <Layout key={key} title="Show threat" button={<PgnFileLoader onPgnLoad={setPgn} />}>
      <div className="grid md:grid-cols-2 gap-6 md: gap-12 bg-white p-6 rounded-md border">
        <NextChessground fen={fen} />
        <h2 className="text-lg font-semibold">Coming soon</h2>
      </div>
    </Layout>
  );
};

export default Page;
