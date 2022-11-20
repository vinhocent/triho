import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRouter } from "next/router";
import { OrbitControls, useCursor } from "@react-three/drei";
import { AsciiEffect } from "three-stdlib";
import { useTheme } from "next-themes";
import { useState, useRef } from "react";

export default function Torusknot(props: any) {
  const { resolvedTheme } = useTheme();
  const { size, gl, scene, camera } = useThree();
  const renderIndex = 1;
  const characters = " .:-+*=%@#";
  const options = { invert: true };

  const ref = useRef<THREE.Mesh>();
  const [clicked, click] = useState(false);
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame((state, delta) => {
    ref.current!.rotation.x = ref.current!.rotation.y += delta / 2;
  });
  return (
    <mesh
      {...props}
      ref={ref}
      scale={1}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <torusKnotGeometry args={[1, 0.2, 30, 7, 10]} />

      <meshToonMaterial color={resolvedTheme === "dark" ? "aqua" : "coral"} />
    </mesh>
  );
}
