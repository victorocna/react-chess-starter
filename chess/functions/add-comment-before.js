const addCommentBefore = (tree, firstMoment, comment) => {
  if (!tree || !firstMoment || comment === undefined || comment === null) {
    return tree;
  }

  return tree.map((branch, branchIndex) => {
    // Only modify the main line (first branch) where the first move exists
    if (branchIndex === 0) {
      const updatedBranch = [...branch];

      // Find the first moment with a move in this branch
      const firstMoveIndex = updatedBranch.findIndex(
        (m) => m.move && m.index === firstMoment.index
      );

      if (firstMoveIndex !== -1) {
        const startingPositionIndex = updatedBranch.findIndex((m) => !m.move);

        if (startingPositionIndex !== -1 && startingPositionIndex < firstMoveIndex) {
          if (comment.trim() === '') {
            // Remove comment property if empty
            const { comment: removedComment, ...positionWithoutComment } =
              updatedBranch[startingPositionIndex];
            updatedBranch[startingPositionIndex] = positionWithoutComment;
          } else {
            updatedBranch[startingPositionIndex] = {
              ...updatedBranch[startingPositionIndex],
              comment: comment.trim(),
            };
          }
        } else if (comment.trim() !== '') {
          // Only create a new starting position if comment is not empty
          const firstMove = updatedBranch[firstMoveIndex];
          const startingPosition = {
            fen: firstMove.fen,
            depth: 1,
            index: firstMove.index - 0.1,
            comment: comment.trim(),
          };

          // Insert the starting position at the beginning of the branch
          updatedBranch.unshift(startingPosition);
        }
      }

      return updatedBranch;
    }

    return branch;
  });
};

export default addCommentBefore;
