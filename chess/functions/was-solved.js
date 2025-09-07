import replyMove from './reply-move';

/**
 * Check if the puzzle was solved
 */
const wasSolved = (history, moments) => {
  return !replyMove(history, moments);
};

export default wasSolved;
