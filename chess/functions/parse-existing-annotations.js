/**
 * Parses an existing suffix string and determines which annotations are selected
 * @param {string} existingSuffix - The existing suffix string from a moment
 * @param {Object} momentAnnotations - Object containing annotation categories (moves, evaluation, symbols)
 * @returns {Object} Selected annotations object with moves, evaluation, and symbols properties
 */
const parseExistingAnnotations = (existingSuffix = '', momentAnnotations = {}) => {
  const selected = { moves: null, evaluation: null, symbols: null };

  Object.keys(momentAnnotations).forEach((category) => {
    const sortedAnnotations = [...momentAnnotations[category]].sort(
      (a, b) => b.suffix.length - a.suffix.length
    );

    const annotation = sortedAnnotations.find((ann) => existingSuffix.includes(ann.suffix));

    if (annotation) {
      selected[category] = annotation;
    }
  });

  return selected;
};

export default parseExistingAnnotations;
