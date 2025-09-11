// Engine configurations for different play modes
// Format: [maxElo, skillLevel, maxError, probability]

export const playEngineConfigs = [
  [800, 1, 4000, 50], // Beginner - very weak
  [1000, 3, 3500, 100], // Novice
  [1200, 5, 3000, 200], // Intermediate
  [1400, 7, 2500, 300], // Advanced
  [1600, 9, 2000, 400], // Expert
  [1800, 11, 1500, 500], // Master
  [2000, 13, 1000, 600], // Grandmaster
  [2200, 15, 500, 700], // Super GM
  [2400, 17, 200, 800], // World Class
  [Infinity, 20, null, null], // 2500+ Maximum strength
];
