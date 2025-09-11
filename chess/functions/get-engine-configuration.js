import { playEngineConfigs } from '@chess/constants/engine-configs';

const getEngineConfiguration = (elo) => {
  const eloNum = parseInt(elo);
  const config = playEngineConfigs.find(([maxElo]) => eloNum <= maxElo);

  return {
    skillLevel: config[1],
    maxError: config[2],
    probability: config[3],
  };
};

export default getEngineConfiguration;
