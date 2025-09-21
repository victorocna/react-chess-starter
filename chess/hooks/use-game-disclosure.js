import { useState, useCallback } from 'react';

const useGameDisclosure = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const endGame = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return { isPlaying, startGame, endGame, toggle };
};

export default useGameDisclosure;
