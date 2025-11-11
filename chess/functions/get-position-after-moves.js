import { Chess } from 'chess.js';

/**
 * Calculates the position (FEN) after applying a specific number of moves from a PV
 * @param {string} startPosition - FEN string representing the starting position
 * @param {string} pvString - Space-separated string of moves in UCI or SAN format
 * @param {number} moveCount - Number of moves to apply (0-indexed)
 * @returns {Object} Object containing the resulting FEN and the last move details { fen, from, to }
 */
const getPositionAfterMoves = (startPosition, pvString, moveCount) => {
  const game = new Chess(startPosition);
  const moves = pvString.split(' ').filter((move) => move.trim() !== '');

  let lastMove = null;

  for (let i = 0; i <= moveCount; i++) {
    try {
      lastMove = game.move(moves[i]);
    } catch (error) {
      break;
    }
  }

  return {
    fen: game.fen(),
    from: lastMove?.from,
    to: lastMove?.to,
  };
};

export default getPositionAfterMoves;
