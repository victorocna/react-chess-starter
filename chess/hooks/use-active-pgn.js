import { extractFen } from '@chess/functions';
import { useRerender } from '@hooks';
import { useEffect, useMemo } from 'react';

const useActivePgn = (data, index) => {
  const [key, rerender] = useRerender();

  // Computed PGN from diagrams
  const pgn = useMemo(() => {
    return data?.diagrams[index]?.pgn;
  }, [data, index]);

  // Computed FEN from PGN
  const fen = useMemo(() => {
    return extractFen(pgn);
  }, [pgn]);

  // Trigger rerender whenever PGN or index changes
  useEffect(() => {
    rerender();
  }, [pgn, index]);

  return {
    key,
    fen,
    pgn,
  };
};

export default useActivePgn;
