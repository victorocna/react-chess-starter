const getEngineConfiguration = (elo, configs) => {
  const eloNum = parseInt(elo);
  const config = configs.find(([maxElo]) => eloNum <= maxElo);

  return {
    skillLevel: config[1],
    maxError: config[2],
    probability: config[3],
  };
};

export default getEngineConfiguration;
