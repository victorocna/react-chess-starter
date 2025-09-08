const addAnnotation = (tree, moment, annotations) => {
  if (!tree || !moment || !annotations) {
    return tree;
  }

  // Create suffix from annotations
  const suffix = [
    annotations.moves?.suffix,
    annotations.evaluation?.suffix,
    annotations.symbols?.suffix,
  ]
    .filter(Boolean)
    .join('');

  return tree.map((branch) => {
    return branch.map((m) => {
      // Update only the targeted moment
      if (m.index === moment.index && suffix) {
        m.suffix = suffix;
      }
      return m;
    });
  });
};

export default addAnnotation;
