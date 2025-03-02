import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRouter } from "next/router";
import { OrbitControls, useCursor } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useState, useRef, useEffect } from "react";
import { AsciiRenderer } from '@react-three/drei'


export default function Torusknot(props: any) {
  const { theme, resolvedTheme } = useTheme();


  const ref = useRef<THREE.Mesh>();
  const [clicked, click] = useState(false);
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame((state, delta) => {
    ref.current!.rotation.y += delta / 2;
    
  });

  return (
    <>


      <mesh
        {...props}
        ref={ref}
        scale={1}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <torusKnotGeometry args={[1, 0.6, 3, 4]} />
        <meshStandardMaterial color={resolvedTheme === "dark" ? "aqua" : "coral"} />
      </mesh>
    </>
  );
}
