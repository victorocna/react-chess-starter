/**
 * Delete moments from the current move (including current move)
 */
export const deleteFrom = (moments, current) => {
  if (!current?.index) {
    return moments;
  }
  // Check if the array is nested or flat
  const isNested = moments.length > 0 && Array.isArray(moments[0]);
  return isNested ? deleteFromTree(moments, current) : deleteFromFlat(moments, current);
};

/**
 * Delete moments from the current move (including current move) in a nested array
 */
export const deleteFromTree = (moments, current) => {
  return moments.map((innerArray) => {
    return innerArray.filter((item) => item.index <= current.index);
  });
};

/**
 * Delete moments from the current move (including current move) in a flat array
 */
export const deleteFromFlat = (moments, current) => {
  return moments.filter((item) => item.index <= current.index);
};

/**
 * Delete moments until the current move (including current move)
 */
export const deleteUntil = (moments, current) => {
  if (!current?.index) {
    return moments;
  }
  // Check if the array is nested or flat
  const isNested = moments.length > 0 && Array.isArray(moments[0]);
  return isNested ? deleteUntilTree(moments, current) : deleteUntilFlat(moments, current);
};

/**
 * Delete moments until the current move (including current move) in a nested array
 */
export const deleteUntilTree = (moments, current) => {
  const newMoments = moments.map((innerArray) => {
    return innerArray.filter((item) => item.index >= current.index);
  });
  // Get the closest moment to the current one and add it as the first moment
  const closest = newMoments.find((innerArray) => {
    return innerArray.some((item) => item.index + 1 == current.index);
  });
  newMoments.unshift([{ fen: closest.fen, depth: closest.depth }]);

  // Reindex the remaining moments
  let newIndex = 0;
  newMoments.map((innerArray) => {
    return innerArray.map((item) => {
      return { ...item, index: newIndex++ };
    });
  });

  return newMoments;
};

/**
 * Delete moments until the current move (including current move) in a flat array
 */
export const deleteUntilFlat = (moments, current) => {
  const newMoments = moments.filter((item) => item.index >= current.index);
  // Get the closest moment to the current one and add it as the first moment
  const closest = moments.find((item) => item.index + 1 == current.index);
  newMoments.unshift({ fen: closest.fen, depth: closest.depth });

  // Reindex the remaining moments
  return newMoments.map((item, idx) => {
    return { ...item, index: idx };
  });
};
