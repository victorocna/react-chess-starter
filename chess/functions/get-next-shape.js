/**
 * Get the next shape to draw based on the current drill state
 */
const getNextShape = (nextMoment, mode, retryCount) => {
  try {
    if (mode === 'arrows') {
      const arrow = {
        orig: nextMoment.from,
        dest: nextMoment.to,
        brush: 'blue',
      };
      return [arrow];
    }
    if (mode === 'squares') {
      const circle = {
        orig: nextMoment.from,
        brush: 'blue',
      };
      return [circle];
    }
    if (mode === 'retry') {
      if (retryCount >= 2) {
        const arrow = {
          orig: nextMoment.from,
          dest: nextMoment.to,
          brush: 'blue',
        };
        return [arrow];
      }
    }
    // Return no shapes for every other mode
    return [];
  } catch {
    return [];
  }
};

export default getNextShape;
