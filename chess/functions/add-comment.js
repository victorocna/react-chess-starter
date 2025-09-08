const addComment = (tree, moment, comment) => {
  if (!tree || !moment || !comment?.trim()) return tree;

  return tree.map(branch =>
    branch.map(m =>
      m.index === moment.index
        ? { ...m, comment: comment.trim() }
        : m
    )
  );
};

export default addComment;
