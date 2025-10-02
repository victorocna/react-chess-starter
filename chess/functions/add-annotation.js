const addAnnotation = (tree, moment, annotations) => {
  if (!tree || !moment || !annotations) {
    return tree;
  }

  const suffix = annotations.moves?.suffix || '';

  const nag =
    annotations.moves?.nag || annotations.evaluation?.nag || annotations.symbols?.nag || '';

  return tree.map((branch) => {
    return branch.map((m) => {
      if (m.index === moment.index) {
        if (suffix) {
          m.suffix = suffix;
        } else {
          delete m.suffix;
        }

        if (nag) {
          m.glyph = nag;
        } else {
          delete m.glyph;
        }
      }
      return m;
    });
  });
};

export default addAnnotation;
