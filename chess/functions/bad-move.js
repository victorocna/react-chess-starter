import goodMove from './good-move';

/**
 * Check if the current move is incorrect
 */
const badMove = (history, moments) => {
  return !goodMove(history, moments);
};

export default badMove;
