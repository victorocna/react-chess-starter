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

  return tree.map((branch) =>
    branch.map((m) => (m.index === moment.index ? { ...m, suffix: suffix || undefined } : m))
  );
};

export default addAnnotation;
