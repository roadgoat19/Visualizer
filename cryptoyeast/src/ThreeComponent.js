import React, { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Texture } from 'three';
import * as THREE from 'three';

// This component will create a mesh with the p5 canvas as its texture
const PlaneMesh = ({ p5Canvas }) => {
  const meshRef = useRef();
  const texture = new THREE.Texture(p5Canvas);

  useFrame(() => {
    texture.needsUpdate = true;
    meshRef.current.rotation.x += 0.01;
  });

  return (
    <mesh ref={meshRef} rotation-x={-Math.PI / 4}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const ThreeComponent = ({ p5Canvas }) => {
  return (
    <Canvas style={{ height: '100vh', backgroundColor: '#FFFFFF' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {p5Canvas && <PlaneMesh p5Canvas={p5Canvas} />}
    </Canvas>
  );
};

export default ThreeComponent;
