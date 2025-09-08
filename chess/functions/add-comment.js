import { tree as chessTree, momentsToPgn } from 'chess-moments';
import { flatten } from 'lodash';

const addComment = (tree, moment, comment) => {
  if (!tree || !moment || !comment?.trim()) return tree;

  const moments = flatten(tree);
  const updatedMoments = moments.map((m) =>
    m.index === moment.index ? { ...m, comment: comment.trim() } : m
  );

  const pgn = momentsToPgn(updatedMoments);
  return chessTree(pgn);
};

export default addComment;
