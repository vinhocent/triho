import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRouter } from "next/router";
import { OrbitControls, useCursor } from "@react-three/drei";
import { AsciiEffect } from "three-stdlib";
import { useTheme } from "next-themes";
import { useState, useRef, useEffect } from "react";

export default function Torusknot(props: any) {
  const { theme, resolvedTheme } = useTheme();
  const { size, gl, scene, camera } = useThree();
  const renderIndex = 1;
  const characters = ' .:-+*=%@#?'; // ASCII characters from darkest to lightest
  const options = {
    resolution: 0.15,    // Lower = more detailed
    scale: 1,
    color: theme === "dark" ? true : false,
    alpha: 0.1,
    characters: characters
  };

  // Set up ASCII effect
  useEffect(() => {
    const effect = new AsciiEffect(gl, characters, options);
    effect.setSize(size.width, size.height);
    effect.domElement.style.position = 'absolute';
    effect.domElement.style.top = '0px';
    effect.domElement.style.left = '0px';
    effect.domElement.style.color = theme === "dark" ? '#00ffff' : '#ff7f50'; // aqua or coral
    effect.domElement.style.backgroundColor = 'transparent';
    effect.domElement.style.pointerEvents = 'none';
    
    // Add effect's DOM element
    gl.domElement.parentNode?.appendChild(effect.domElement);

    // Original renderer must continue rendering for the ASCII effect to update
    gl.domElement.style.opacity = '0';
    gl.domElement.style.position = 'absolute';

    // Render loop
    const renderScene = () => {
      effect.render(scene, camera);
      requestAnimationFrame(renderScene);
    };
    renderScene();

    // Cleanup
    return () => {
      effect.domElement.remove();
      gl.domElement.style.opacity = '1';
    };
  }, [gl, scene, camera, size, theme]);

  const ref = useRef<THREE.Mesh>();
  const [clicked, click] = useState(false);
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame((state, delta) => {
    ref.current!.rotation.x = ref.current!.rotation.y += delta / 2;
  });

  return (
    <>
      {/* Add ambient light for overall illumination */}
      <ambientLight intensity={0.5} />
      {/* Add directional light for shadows and depth */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <mesh
        {...props}
        ref={ref}
        scale={1}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <torusKnotGeometry args={[2, 0.3, 128, 16, 1, 2]} />
        <meshStandardMaterial color={theme === "dark" ? "aqua" : "coral"} />
      </mesh>
    </>
  );
}
