/**
 * Parses existing suffix and glyph properties and determines which annotations are selected
 * @param {Object} moment - The moment object containing suffix and/or glyph properties
 * @param {Object} momentAnnotations - Object containing annotation categories (moves, evaluation, symbols)
 * @returns {Object} Selected annotations object with moves, evaluation, and symbols properties
 */
const parseExistingAnnotations = (moment = {}, momentAnnotations = {}) => {
  const selected = { moves: null, evaluation: null, symbols: null };
  const existingSuffix = moment.suffix || '';
  const existingGlyph = moment.glyph || '';

  Object.keys(momentAnnotations).forEach((category) => {
    const annotations = momentAnnotations[category];

    if (category === 'moves') {
      const sortedAnnotations = [...annotations].sort((a, b) => {
        const aLen = a.suffix?.length || 0;
        const bLen = b.suffix?.length || 0;
        return bLen - aLen;
      });

      const annotation = sortedAnnotations.find((ann) => {
        return ann.suffix && existingSuffix.includes(ann.suffix);
      });

      if (annotation) {
        selected[category] = annotation;
      }
    } else {
      const annotation = annotations.find((ann) => {
        return ann.nag && existingGlyph === ann.nag;
      });

      if (annotation) {
        selected[category] = annotation;
      }
    }
  });

  return selected;
};

export default parseExistingAnnotations;
