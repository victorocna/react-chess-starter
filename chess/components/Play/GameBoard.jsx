import { getEngineConfiguration } from '@chess/functions';
import { useEngine } from '@chess/hooks';
import { useEffect } from 'react';
import { ChessBoard } from '.';

const GameBoard = ({
  handleGameOver,
  elo,
  fen,
  playerColor = 'white',
  thinkTime = 1000,
  orientation = 'white',
  config,
}) => {
  const engine = useEngine();

  // Update bot strength using skill level system when ELO changes
  useEffect(() => {
    if (engine && elo) {
      const { skillLevel, maxError, probability } = getEngineConfiguration(elo, config);

      if (engine.updateSkillLevel) {
        engine.updateSkillLevel(skillLevel, maxError, probability);
      }
    }
  }, [engine, elo]);

  return (
    <ChessBoard
      fen={fen}
      orientation={orientation}
      playerColor={playerColor}
      engine={engine}
      thinkTime={thinkTime}
      onGameOver={handleGameOver}
    />
  );
};

export default GameBoard;
