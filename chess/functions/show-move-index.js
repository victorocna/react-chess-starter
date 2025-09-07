/**
 * Show move index or not?
 */
const showMoveIndex = (moment, fen, depth) => {
  if (!moment || !moment.move) {
    return true;
  }

  const side = fen.split(' ')[1];
  if (side === 'b') {
    return true;
  }

  return !!moment.comment || moment.depth > depth;
};

export default showMoveIndex;
