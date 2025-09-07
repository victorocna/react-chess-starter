import { momentsToPgn } from 'chess-moments';

/**
 * Get the mainline PGN from the given moments.
 */
const copyMainlinePgn = (moments) => {
  if (!moments || moments.length === 0) {
    return '';
  }

  // Filter out all variations (depth > 1) to keep only mainline moves
  const mainlineMoments = moments.filter((moment) => moment.depth === 1);
  if (mainlineMoments.length === 0) {
    return '';
  }

  return momentsToPgn(mainlineMoments);
};

export default copyMainlinePgn;
