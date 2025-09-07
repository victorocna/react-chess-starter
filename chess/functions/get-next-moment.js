/**
 * Get the next moment in the drill based on the current FEN
 */
const getNextMoment = (moments, currentFen) => {
  try {
    // Find the current moment based on the current FEN
    const currentMoment = moments.find((moment) => moment.fen === currentFen);
    // Get the next move after the current moment
    const nextMomentIndex = moments.indexOf(currentMoment) + 1;
    const nextMoment = moments[nextMomentIndex];

    return nextMoment;
  } catch {
    return null;
  }
};

export default getNextMoment;
