import { emptyPgn } from '@chess/constants/empty-pgn';
import { extractFen, pgnSplit } from '@chess/functions';
import { useRerender } from '@hooks';
import { useMemo, useState } from 'react';
import { local } from 'store2';

const useLocalPgn = () => {
  const [rawPgn, setRawPgn] = useState(() => local.get('pgn') || emptyPgn);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [key, rerender] = useRerender();

  const games = useMemo(() => {
    const parsedGames = pgnSplit(rawPgn);
    return parsedGames.length > 0 ? parsedGames : [rawPgn];
  }, [rawPgn]);

  const pgn = games[currentGameIndex] || games[0] || emptyPgn;
  const fen = extractFen(pgn);

  const setPgn = (newPgn) => {
    setRawPgn(newPgn);
    setCurrentGameIndex(0); // Reset to first game when new PGN is loaded
    local.set('pgn', newPgn);
    rerender(); // Trigger rerender when PGN changes
  };

  const setGameIndex = (index) => {
    if (index >= 0 && index < games.length) {
      setCurrentGameIndex(index);
      rerender(); // Trigger rerender when game index changes
    }
  };

  return {
    key,
    fen,
    pgn,
    setPgn,
    games,
    currentGameIndex,
    setGameIndex,
  };
};

export default useLocalPgn;
