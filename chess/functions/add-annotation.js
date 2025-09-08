import { tree as chessTree, momentsToPgn } from 'chess-moments';
import { flatten } from 'lodash';

const addAnnotation = (tree, moment, annotations) => {
  if (!tree || !moment || !annotations) return tree;

  // Create suffix from annotations
  const suffix = [
    annotations.moves?.suffix,
    annotations.evaluation?.suffix,
    annotations.symbols?.suffix,
  ]
    .filter(Boolean)
    .join('');

  const moments = flatten(tree);
  const updatedMoments = moments.map((m) =>
    m.index === moment.index ? { ...m, suffix: suffix || undefined } : m
  );

  const pgn = momentsToPgn(updatedMoments);
  return chessTree(pgn);
};

export default addAnnotation;
