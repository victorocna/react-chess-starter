import getNextMoment from './get-next-moment';

/**
 * Check if the current drill move is correct
 */
const checkDrillMove = (moments, currentFen, history) => {
  try {
    const nextMoment = getNextMoment(moments, currentFen);
    const currentMove = history[history.length - 1];
    return nextMoment.move === currentMove;
  } catch {
    return false;
  }
};

export default checkDrillMove;
