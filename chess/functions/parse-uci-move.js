/**
 * Parse UCI move string to components
 * @param {string} uciMove - UCI format move (e.g., 'e2e4', 'e7e8q')
 * @returns {Object} Object with from, to, and optional promotion
 */
const parseUciMove = (uciMove) => ({
  from: uciMove.substring(0, 2),
  to: uciMove.substring(2, 4),
  promotion: uciMove.length > 4 ? uciMove.substring(4) : undefined,
});

export default parseUciMove;
