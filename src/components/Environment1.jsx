import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, Plane} from '@react-three/drei';
import TreeModel from './models/TreeModel';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { createPositions } from './utils/createPositions';
import GrassModel from './models/GrassModel';


function Environment1({count = 13}) {
  const texture = useLoader(TextureLoader, '/textures/ground1.jpg');

  let trees = [];
  let treePositions = createPositions(4.8, count)
  
  for(let i=0;i<count;i++) {
    trees.push(<TreeModel key={`tree ${i}`} position={treePositions[i]}/>);
  }

  let grass = [];
  let grassPositions = createPositions(4.2, 75)
  
  for(let i=0;i<75;i++) {
    grass.push(<GrassModel key={`tree ${i}`} position={grassPositions[i]}/>);
  }
  return (
    <Canvas>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Environment preset='park' />
      <Suspense fallback={null}>
        <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <meshStandardMaterial map={texture} color='#d18b86'/>
        </Plane>
        {grass}
        {trees}
      </Suspense>
    </Canvas>
  );
}

export default Environment1;
