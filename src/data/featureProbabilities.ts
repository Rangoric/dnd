export const featureProbabilities = [
  { feature: "Settlement", weight: 40 },
  { feature: "Dungeon", weight: 30 },
  { feature: "Ruins", weight: 30 },
];

export function getRandomFeature() {
  const totalWeight = featureProbabilities.reduce((sum, feature) => sum + feature.weight, 0);
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const feature of featureProbabilities) {
    cumulativeWeight += feature.weight;
    if (random < cumulativeWeight) {
      return feature.feature;
    }
  }
  return featureProbabilities[0].feature; // Fallback to the first feature
}
