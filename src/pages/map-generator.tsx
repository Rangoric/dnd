import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "@/styles/MapGenerator.module.css";
import { getRandomBiome } from "@/data/terrainProbabilities";
import { getRandomFeature } from "@/data/featureProbabilities";

function generateHexMap(rows: number, cols: number) {
  const map = [];
  for (let row = 0; row < rows; row++) {
    const rowData = [];
    for (let col = 0; col < cols; col++) {
      const biome = getRandomBiome();
      const feature = Math.random() < 0.5 ? getRandomFeature() : null; // 50% chance for a feature
      rowData.push({ biome, feature });
    }
    map.push(rowData);
  }
  return map;
}

const biomeColors: Record<string, string> = {
  Plains: "#a8d5ba",
  Forest: "#6b8e23",
  Mountain: "#d9d9d9",
  Water: "#87ceeb",
};

export default function MapGenerator() {
  const [map, setMap] = useState(() => generateHexMap(10, 10));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const hexWidth = 120; // Width of the hex
  const hexHeight = 104; // Height of the hex
  const hexSide = 60; // Side length of the hex

  return (
    <>
      <Head>
        <title>Map Generator</title>
        <meta name="description" content="Generate random D&D maps with hexes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {isClient && (
        <div className={styles.container}>
          <h1>Random Map Generator</h1>
          <button onClick={() => setMap(generateHexMap(20, 20))}>Generate New Map</button>
          <div className={styles.map}>
            {map.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={styles.row}
                style={{ marginTop: rowIndex === 0 ? "0" : `-${hexHeight / 2}px` }}
              >
                {row.map((hex, colIndex) => (
                  <div
                    key={colIndex}
                    className={styles.hex}
                    style={{
                      backgroundColor: biomeColors[hex.biome],
                      marginLeft: colIndex === 0 ? "0" : `-${hexSide / 2}px`,
                      marginTop: colIndex % 2 === 0 ? "0" : `${hexHeight / 2}px`,
                    }}
                  >
                    <div>{hex.biome}</div>
                    {hex.feature && <div>{hex.feature}</div>}
                    <div>{`(${rowIndex}, ${colIndex})`}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
