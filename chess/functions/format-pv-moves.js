import { Chess } from 'chess.js';
import parseFen from './parse-fen';

/**
 * Formats PV (Principal Variation) moves with proper chess notation numbering
 * @param {string} position - FEN string representing the current position
 * @param {string} pvString - Space-separated string of moves in UCI or SAN format
 * @returns {string} Formatted move sequence with proper numbering (e.g., "1. e4 e5 2. Nf3")
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
    return ''; // Invalid FEN
  }

  const whiteToMove = fenInfo.activeColor === 'w';
  let moveNumber = fenInfo.fullmoveNumber;
  let displayPv = '';

  const history = game.history();
  if (history.length === 0) {
    return '';
  }

  // Format the first move
  if (whiteToMove) {
    displayPv += `${moveNumber}. ${history[0]}`;
  } else {
    displayPv += `${moveNumber}... ${history[0]}`;
  }

  // Format subsequent moves
  for (let i = 1; i < history.length; i++) {
    if (whiteToMove) {
      if (i % 2 === 1) {
        displayPv += ` ${history[i]}`;
      } else {
        moveNumber++;
        displayPv += ` ${moveNumber}. ${history[i]}`;
      }
    } else {
      if (i % 2 === 0) {
        displayPv += ` ${history[i]}`;
      } else {
        moveNumber++;
        displayPv += ` ${moveNumber}. ${history[i]}`;
      }
    }
  }

  return displayPv;
};

export default formatPvMoves;
