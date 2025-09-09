const pgnSplit = (pgn) => {
  try {
    return pgn
      .split('[Event ')
      .map((str) => `[Event ${str}`)
      .slice(1);
  } catch (err) {
    return [];
  }
};

export default pgnSplit;
