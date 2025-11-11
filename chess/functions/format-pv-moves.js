import { Chess } from 'chess.js';
import parseFen from './parse-fen';

/**
 * Formats PV (Principal Variation) moves with proper chess notation numbering
 * @param {string} position - FEN string representing the current position
 * @param {string} pvString - Space-separated string of moves in UCI or SAN format
 * @returns {Array} Array of move objects with move, moveNumber, and isWhite properties
 */
const formatPvMoves = (position, pvString) => {
  const game = new Chess(position);
  const moves = pvString.split(' ').filter((move) => move.trim() !== '');

  // Apply moves to the game
  for (let i = 0; i < moves.length; i++) {
    try {
      game.move(moves[i]);
    } catch (error) {
      console.warn('Invalid move in PV:', moves[i], error);
      break; // Stop processing moves if one is invalid
    }
  }

  // Use parseFen to get position info
  const fenInfo = parseFen(position);
  if (!fenInfo) {
    return []; // Invalid FEN
  }

  const whiteToMove = fenInfo.activeColor === 'w';
  let moveNumber = fenInfo.fullmoveNumber;
  const formattedMoves = [];

  const history = game.history();
  if (history.length === 0) {
    return [];
  }

  for (let i = 0; i < history.length; i++) {
    const isWhite = whiteToMove ? i % 2 === 0 : i % 2 === 1;
    const currentMoveNumber = whiteToMove
      ? moveNumber + Math.floor(i / 2)
      : i === 0
      ? moveNumber
      : moveNumber + Math.floor((i + 1) / 2);

    formattedMoves.push({
      move: history[i],
      moveNumber: currentMoveNumber,
      isWhite,
      showNumber: isWhite || i === 0,
    });
  }

  return formattedMoves;
};

export default formatPvMoves;
