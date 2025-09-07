import { last } from 'lodash';

/**
 * Get the reply move for the current position
 * Reply move is the next moment after the last good move made by the user
 */
const replyMove = (history, moments) => {
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

export default replyMove;
