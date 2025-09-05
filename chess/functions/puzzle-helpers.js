import { last } from 'lodash';

/**
 * Check if the current move is correct
 * A move is correct if the current moment FEN equals any FEN moment from the PGN
 */
export const goodMove = (history, moments) => {
  const currentFen = last(history)?.after;
  for (const moment of moments) {
    if (moment?.fen === currentFen) {
      return true;
    }
  }
  return false;
};

/**
 * Check if the current move is incorrect
 */
export const badMove = (history, moments) => {
  return !goodMove(history, moments);
};

/**
 * Get the reply move for the current position
 * Reply move is the next moment after the last good move made by the user
 */
export const replyMove = (history, moments) => {
  const currentFen = last(history)?.after;
  const currentMove = moments.find((moment) => moment.fen === currentFen);
  // Find the closest next move based on the current move
  const nextMove = moments.find((moment) => {
    return (
      moment?.move && //
      moment?.depth === currentMove?.depth &&
      moment?.index > currentMove?.index
    );
  });
  return nextMove;
};

/**
 * Check if the puzzle was solved
 */
export const wasSolved = (history, moments) => {
  return !replyMove(history, moments);
};
