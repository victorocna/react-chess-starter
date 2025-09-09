const normalizePgn = (pgn) => {
  const fen = pgn.split('[FEN "').pop().split('"]').shift();

  if (fen.split(' ').pop() === '0') {
    return pgn.replace(fen, fen.substring(0, fen.length - 1) + '1');
  }

  return pgn;
};

export default normalizePgn;
