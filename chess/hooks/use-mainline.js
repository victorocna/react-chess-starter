import { mainline } from 'chess-moments';
import { useMemo } from 'react';

const useMainline = (pgn, initialFen) => {
  const moments = useMemo(() => mainline(pgn), [pgn]);

  // Start from different index if initial FEN exists
  let startingIndex = 0;
  if (initialFen) {
    const initialMoment = moments.findIndex((moment) => moment.fen === initialFen);
    startingIndex = initialMoment?.index || 0;
  }

  // Moves are mainline moments
  const moves = useMemo(() => {
    return moments.filter((moment) => {
      return moment.depth === 1 && moment.move && moment.index >= startingIndex;
    });
  }, [moments]);

  return { moves };
};

export default useMainline;
