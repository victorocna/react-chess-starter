/**
 * Delete moments from the current move (including current move) in a nested array
 */
const deleteFromTree = (moments, current) => {
  return moments.map((innerArray) => {
    return innerArray.filter((item) => item.index <= current.index);
  });
};

/**
 * Delete moments from the current move (including current move) in a flat array
 */
const deleteFromFlat = (moments, current) => {
  return moments.filter((item) => item.index <= current.index);
};

/**
 * Delete moments from the current move (including current move)
 */
const deleteFrom = (moments, current) => {
  if (!current?.index) {
    return moments;
  }
  // Check if the array is nested or flat
  const isNested = moments.length > 0 && Array.isArray(moments[0]);
  return isNested ? deleteFromTree(moments, current) : deleteFromFlat(moments, current);
};

export default deleteFrom;
