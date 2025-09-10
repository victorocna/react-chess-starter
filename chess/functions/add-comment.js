const addComment = (tree, moment, comment) => {
  if (!tree || !moment || comment === undefined || comment === null) {
    return tree;
  }

  return tree.map((branch) => {
    return branch.map((m) => {
      // Update only the targeted moment
      if (m.index === moment.index) {
        if (comment.trim() === '') {
          // Remove comment property if empty
          const { comment: removedComment, ...momentWithoutComment } = m;
          return momentWithoutComment;
        } else {
          m.comment = comment.trim();
        }
      }
      return m;
    });
  });
};

export default addComment;
