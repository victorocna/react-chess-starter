import { getMoveArrow } from '../functions';
import { useState, useEffect } from 'react';

const useMoveArrow = (fen) => {
  const [arrow, setArrow] = useState(null);

  // Clear the arrow whenever the FEN changes (e.g. new diagram)
  useEffect(() => {
    setArrow(null);
  }, [fen]);

  // Helper to update the arrow state.
  const showArrow = (move) => {
    if (move && fen) {
      const newArrow = getMoveArrow(fen, move);
      setArrow(newArrow);
    } else {
      setArrow(null);
    }
  };

  // For desktop hover events.
  const handleHoverMove = (move) => {
    showArrow(move);
  };

  // For mobile click events with toggle behavior.
  const handleClickMove = (move) => {
    const newArrow = getMoveArrow(fen, move);
    if (arrow && newArrow && arrow.orig === newArrow.orig && arrow.dest === newArrow.dest) {
      setArrow(null);
    } else {
      setArrow(newArrow);
    }
  };

  return { arrow, showArrow, handleHoverMove, handleClickMove };
};

export default useMoveArrow;
