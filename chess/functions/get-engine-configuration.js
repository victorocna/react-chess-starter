const getEngineConfiguration = (elo) => {
  const eloNum = parseInt(elo);

  // Configuration mapping: [maxElo, skillLevel, maxError, probability]
  const configs = [
    [200, 0, 5000, 1],
    [400, 1, 5000, 1],
    [600, 2, 5000, 1],
    [750, 3, 5000, 1],
    [850, 4, 2500, 200],
    [950, 5, 2500, 200],
    [1000, 6, 2500, 200],
    [1100, 7, 2500, 200],
    [1150, 8, 2500, 200],
    [1200, 9, 1000, 500],
    [1250, 10, 1000, 500],
    [1350, 11, 1000, 500],
    [1450, 12, 1000, 500],
    [1550, 13, 1000, 500],
    [1650, 14, 1000, 500],
    [1750, 15, 1000, 500],
    [1800, 16, 100, 800],
    [1900, 17, 100, 800],
    [2200, 18, 100, 800],
    [2400, 19, 100, 800],
    [Infinity, 20, null, null], // 2400+ ELO
  ];

  const [, skillLevel, maxError, probability] = configs.find(([maxElo]) => eloNum <= maxElo);

  return {
    skillLevel,
    maxError,
    probability,
  };
};

export default getEngineConfiguration;
