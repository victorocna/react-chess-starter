/**
 * Converts engine score data into a human-readable string format
 * @param {string} type - Score type: 'cp' for centipawns, 'mate' for mate scores
 * @param {number} value - Numeric score value
 * @returns {string} Formatted score string (e.g., "1.25", "#5", "0.00")
 */
const formatEngineScore = (type, value) => {
  if (!type) {
    return '0.00';
  }
  if (type === 'cp') {
    return (value / 100).toFixed(2);
  }
  return '#' + Math.abs(value);
};

export default formatEngineScore;
