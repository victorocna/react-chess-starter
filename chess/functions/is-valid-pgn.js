import { pgn } from 'chess-moments';
import { Chess } from 'chess.js';
import pgnSplit from './pgn-split';

const isValidPgn = (content) => {
  try {
    const dirtyPgn = pgnSplit(content)[0];
    const cleanPgn = pgn.normalize(dirtyPgn);

    const chess = new Chess();
    chess.loadPgn(cleanPgn);

    return true;
  } catch (err) {
    return false;
  }
};

export default isValidPgn;
