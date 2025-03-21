export const biomeProbabilities = [
  { type: "Plains", weight: 50 },
  { type: "Forest", weight: 30 },
  { type: "Mountain", weight: 15 },
  { type: "Water", weight: 5 },
];

export function getRandomBiome() {
  const totalWeight = biomeProbabilities.reduce((sum, biome) => sum + biome.weight, 0);
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const biome of biomeProbabilities) {
    cumulativeWeight += biome.weight;
    if (random < cumulativeWeight) {
      return biome.type;
    }
  }
  return biomeProbabilities[0].type; // Fallback to the first type
}
