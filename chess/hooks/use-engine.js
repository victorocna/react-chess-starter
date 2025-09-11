import { Stockfish } from '@chess/stockfish/stockfish-wrapper';
import { useEffect, useState } from 'react';

const useEngine = () => {
  const [engine] = useState(new Stockfish('/stockfish.asm.js'));

  // chess engine
  useEffect(() => {
    engine.init();
    return () => {
      engine.quit();
    };
  }, []);

  // Engine turn logic
  const [engineTurn, setEngineTurn] = useState(true);
  const toggleEngineTurn = () => {
    setEngineTurn(!engineTurn);
  };

  engine.turn = engineTurn;
  engine.toggleTurn = toggleEngineTurn;

  return engine;
};

export default useEngine;
