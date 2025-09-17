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
      if (m.index === moment.index) {
        if (suffix) {
          m.suffix = suffix;
        } else {
          // Remove suffix when no annotations
          delete m.suffix;
        }
      }
      return m;
    });
  });
};

export default addAnnotation;
