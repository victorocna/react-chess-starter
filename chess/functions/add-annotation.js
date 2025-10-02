const addAnnotation = (tree, moment, annotations) => {
  if (!tree || !moment || !annotations) {
    return tree;
  }

  // Create suffix from move annotations (only those with .suffix property)
  const suffix = annotations.moves?.suffix || '';

  // Create glyph from NAG codes (evaluation and symbols)
  const nag = annotations.evaluation?.nag || annotations.symbols?.nag || '';

  return tree.map((branch) => {
    return branch.map((m) => {
      if (m.index === moment.index) {
        // Handle suffix (move annotations)
        if (suffix) {
          m.suffix = suffix;
        } else {
          delete m.suffix;
        }

        // Handle glyph (NAG codes for evaluation and symbols)
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
