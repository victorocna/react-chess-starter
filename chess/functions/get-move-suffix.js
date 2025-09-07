/**
 * Get the move suffix for a given FEN string.
 */
const getMoveSuffix = (fen) => {
  const side = fen.split(' ')[1];
  const fullmove = fen.split(' ')[5];
  const moveIndex = fullmove - (side === 'w' ? 1 : 0);
  const dots = side === 'w' ? '...' : '.';

  return moveIndex + dots;
};

export default getMoveSuffix;
