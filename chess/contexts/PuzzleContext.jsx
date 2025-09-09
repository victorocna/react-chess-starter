import { last, size } from 'lodash';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { goodMove, wasSolved } from '../functions';
import { useChessContext } from './ChessContext';

const PuzzleContext = createContext();

export const PuzzleProvider = ({ children }) => {
  // Chess context
  const { isUserTurn, history, currentFen } = useChessContext();

  // Puzzle states
  const [solution, setSolution] = useState(null);
  const [feedback, setFeedback] = useState('start');
  const [lastMove, setLastMove] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Update feedback and lastMove when history changes
  useEffect(() => {
    if (isUserTurn && size(history)) {
      const isGoodMove = goodMove(history, solution);
      const feedback = isGoodMove ? 'success' : 'error';
      setFeedback(feedback);
      const lastMove = last(history)?.to;
      setLastMove(lastMove);
      // Check if puzzle is completed - only if the move was good
      if (isGoodMove && wasSolved(history, solution)) {
        setIsCompleted(true);
      }
    } else {
      setFeedback('start');
      setLastMove(null);
    }
  }, [history]);

  // Computed shapes for the current position
  const shapes = useMemo(() => {
    const currentMove = solution?.find((m) => m.fen === currentFen);
    return currentMove?.shapes || [];
  }, [currentFen, solution]);

  const value = {
    shapes,
    solution,
    setSolution,
    feedback,
    lastMove,
    isCompleted,
    viewOnly,
    setViewOnly,
  };

  return <PuzzleContext.Provider value={value}>{children}</PuzzleContext.Provider>;
};

export const usePuzzleContext = () => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error('usePuzzleContext must be used within a PuzzleProvider');
  }
  return context;
};
