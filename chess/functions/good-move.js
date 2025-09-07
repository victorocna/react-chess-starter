import { last } from 'lodash';

/**
 * Check if the current move is correct
 * A move is correct if the current moment FEN equals any FEN moment from the PGN
 */
const goodMove = (history, moments) => {
  const currentFen = last(history)?.after;
  for (const moment of moments) {
    if (moment?.fen === currentFen) {
      return true;
    }
  }
  return false;
};

export default goodMove;
