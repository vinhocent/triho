import { Line } from "@react-three/drei";
import { useMemo } from "react";

type BirdSpec = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

export default function AsciiBirds({
  count = 60,
}: {
  count?: number;
}) {
  const birds = useMemo<BirdSpec[]>(() => {
    return Array.from({ length: count }, () => {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 4;
      const scale = 0.25 + Math.random() * 0.6;
      const rotation: [number, number, number] = [
        0,
        0,
        (Math.random() - 0.5) * 0.6,
      ];
      return { position: [x, y, z], rotation, scale };
    });
  }, [count]);

  const birdShape: [number, number, number][] = [
    [-1, 0, 0],
    [0, 0.6, 0],
    [1, 0, 0],
  ];

  return (
    <>
      {birds.map((bird, index) => (
        <Line
          key={index}
          points={birdShape}
          position={bird.position}
          rotation={bird.rotation}
          scale={bird.scale}
          color="white"
          lineWidth={1}
        />
      ))}
    </>
  );
}
