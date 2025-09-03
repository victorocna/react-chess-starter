import { extractFen } from '@chess/functions';
import { useRerender } from '@hooks';
import { useEffect, useMemo, useState } from 'react';
import { local } from 'store2';

const useLocalPgn = () => {
  // Load the default PGN if not already set in local storage
  const defaultPgn = [
    '[FEN "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]', //
    '[SetUp "1"]',
    '',
    '*',
  ].join('\n');
  const localPgn = local.get('pgn') || defaultPgn;

  // State to manage the PGN and a rerender function
  const [pgn, setPgn] = useState(localPgn);
  const [key, rerender] = useRerender();

  // Extract FEN
  const fen = useMemo(() => {
    return extractFen(pgn);
  }, [pgn]);

  // Trigger rerender whenever PGN changes
  useEffect(() => {
    rerender();
  }, [pgn]);

  return {
    key,
    fen,
    pgn,
    setPgn,
  };
};

export default useLocalPgn;
