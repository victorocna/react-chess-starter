import { isArray } from 'lodash';
import { constants } from 'next-chessground';

/**
 * Extracts the FEN string from a PGN string.
 */
const extractFen = (pgn) => {
  if (!pgn) {
    return constants.initialFen;
  }

  const lines = isArray(pgn) ? pgn : pgn.split('\n');
  const fenLine = lines.find((line) => line.startsWith('[FEN'));
  if (!fenLine) {
    return constants.initialFen;
  }

  const fenMatch = fenLine.match(/\[FEN "(.+?)"\]/);
  return fenMatch ? fenMatch[1] : constants.initialFen;
};

export default extractFen;
