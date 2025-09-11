import { useChessContext } from '@chess/contexts';
import { getEngineConfiguration } from '@chess/functions';
import { useEngine } from '@chess/hooks';
import { coffee } from '@functions';
import { isFunction } from 'lodash';
import { useEffect } from 'react';
import { ChessBoard } from '.';

const GameBoard = ({ botElo, onGameOver }) => {
  const engine = useEngine();
  const { initialFen } = useChessContext();

  // Update bot strength using skill level system when ELO changes
  useEffect(() => {
    if (engine && botElo) {
      const { skillLevel, maxError, probability } = getEngineConfiguration(botElo);

      if (engine.updateSkillLevel) {
        engine.updateSkillLevel(skillLevel, maxError, probability);
      }
    }
  }, [engine, botElo]);

  // Handle game over
  const handleGameOver = async (chess) => {
    let winner = 'Draw';
    if (chess.isCheckmate()) {
      winner = chess.turn() === 'w' ? 'Black' : 'White';
    }

    await coffee(500);
    if (isFunction(onGameOver)) {
      onGameOver(winner);
    }
  };

  return (
    <ChessBoard fen={initialFen} orientation="white" engine={engine} onGameOver={handleGameOver} />
  );
};

export default GameBoard;
