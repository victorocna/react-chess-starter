import { moveTrainer } from 'chess-moments';
import { compact, flatten, isEmpty, map } from 'lodash';
import { useState } from 'react';

const useMoveTrainer = (pgn, fen) => {
  // Load the chess tree from the PGN and filter out empty moves
  const train = moveTrainer(pgn, fen).filter((item) => !isEmpty(item));

  // Remove all hidden moves from this array of arrays
  const moves = train.map((move) => move.filter((m) => !m.hidden));

  // Group all hidden moves into a single array
  const hidden = train
    .map((move) => move.filter((m) => m.hidden))
    .reduce((acc, curr) => acc.concat(curr), [])
    .filter((m) => m !== undefined);
  const solution = compact(map(hidden, 'move'));

  // Current moment is last move
  const nonEmptyMoves = flatten(moves.filter((move) => !isEmpty(move)));
  const currentMoment = nonEmptyMoves[nonEmptyMoves.length - 1];

  // History
  const [history, setHistory] = useState([]);

  return {
    tree: moves,
    solution,
    current: currentMoment,
    history,
    setHistory,
  };
};

export default useMoveTrainer;
