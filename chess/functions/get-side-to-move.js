const getSideToMove = (fen) => {
  try {
    const parts = fen.split(' ');
    return parts[1];
  } catch {
    return null;
  }
};

export default getSideToMove;
