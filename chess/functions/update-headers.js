const updateHeaders = (tree, updatedHeaders) => {
  if (!tree || !tree.length) {
    return tree;
  }

  return tree.map((branch, branchIndex) => {
    return branch.map((moment, momentIndex) => {
      if (branchIndex === 0 && momentIndex === 0) {
        return {
          ...moment,
          headers: {
            ...moment.headers,
            ...updatedHeaders,
          },
        };
      }
      return moment;
    });
  });
};

export default updateHeaders;
