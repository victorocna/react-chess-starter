import { PLAY_ENGINE_CONFIGS } from '@chess/constants';

const getEngineConfiguration = (elo) => {
  const eloNum = parseInt(elo);
  const [, skillLevel, maxError, probability] = PLAY_ENGINE_CONFIGS.find(([maxElo]) => eloNum <= maxElo);

  return {
    skillLevel,
    maxError,
    probability,
  };
};

export default getEngineConfiguration;
