/**
 * Convert chess.js move object to UCI format
 * @param {Object} move - Chess.js move object with from, to, and optional promotion
 * @returns {string} UCI format move (e.g., 'e2e4', 'e7e8q')
 */
const toUciMove = (move) => `${move.from}${move.to}${move.promotion || ''}`;

export default toUciMove;
