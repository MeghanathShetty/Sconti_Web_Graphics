import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Box1() {
  const meshRef = useRef();

  return (
    <Canvas style={{ height: '800px', width: '800px' }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={meshRef} rotation={[0.5, 0.5, 0.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <BoxRotation meshRef={meshRef} />
    </Canvas>
  );
}

function BoxRotation({ meshRef }) {
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return null;
}

export default Box1;
