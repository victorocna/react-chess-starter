import { last, size } from 'lodash';
import { createContext, useContext, useEffect, useState } from 'react';
import { goodMove, wasSolved } from '../functions/puzzle-helpers';
import { useChessContext } from './ChessContext';

const PuzzleContext = createContext();

export const PuzzleProvider = ({ children }) => {
  // Chess context
  const { isUserTurn, history } = useChessContext();

  // Puzzle states
  const [solution, setSolution] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Update feedback and lastMove when history changes
  useEffect(() => {
    if (isUserTurn && size(history)) {
      const feedback = goodMove(history, solution) ? 'success' : 'error';
      setFeedback(feedback);
      const lastMove = last(history)?.to;
      setLastMove(lastMove);
      // Check if puzzle is completed
      if (wasSolved(history, solution)) {
        setIsCompleted(true);
      }
    } else {
      setFeedback(null);
      setLastMove(null);
    }
  }, [history]);

  const value = {
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
