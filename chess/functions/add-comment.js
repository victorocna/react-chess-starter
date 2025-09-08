const addComment = (tree, moment, comment) => {
  if (!tree || !moment || !comment?.trim()) {
    return tree;
  }

  return tree.map((branch) => {
    return branch.map((m) => {
      // Update only the targeted moment
      if (m.index === moment.index && comment.trim()) {
        m.comment = comment.trim();
      }
      return m;
    });
  });
};

export default addComment;
