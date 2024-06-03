import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, Plane} from '@react-three/drei';
import TreeModel from './models/TreeModel';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { createPositions } from './utils/createPositions';
import GrassModel from './models/GrassModel';
import TreeSaplingModel from './models/TreeSapling';

function Environment1Sapling({count = 9 }) {
  const texture = useLoader(TextureLoader, '/textures/ground1.jpg');
  const [scoredPlants, setScoredPlants] = useState([]);
  const [score, setScore] = useState(-1);

  function handleScore(val) {
    setScore(val);
  }

  let grass = [];
  let grassPositions = createPositions(4.2, 75)
  
  for(let i=0;i<75;i++) {
    grass.push(<GrassModel key={`tree ${i}`} position={grassPositions[i]}/>);
  }

  let trees = [];
  let treePositions = createPositions(4.8, count)
    
  for(let i=0;i<count;i++) {
    trees.push(<TreeModel key={`tree ${i}`} position={treePositions[i]}/>);
  }

  // let scoredPlants = [];
  useEffect(()=>{
    if(score != -1) {
      if(score>7) {
        let position = createPositions(4.8, 1, treePositions, true);
        setScoredPlants(prevScores => [...prevScores,<TreeModel key={`tree ${Math.random()}`} position={position}/>]);
      } else {
        let position = createPositions(4.8, 1, treePositions, true);
        setScoredPlants(prevScores => [...prevScores,<TreeSaplingModel key={`tree ${Math.random()}`} position={position}/>]);
      }
    }
  },[score]);

  return (
    <>
        <input type='number' onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleScore(e.target.value);
            e.target.value = '';
          }
        }} />
    <Canvas>
      <ambientLight intensity={0.9} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Environment preset='sunset' />
      <Suspense fallback={null}>
        <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <meshStandardMaterial map={texture} color='#d18b86'/>
        </Plane>
        {grass}
        {trees}
        {scoredPlants}
      </Suspense>
    </Canvas>
    </>
  );
}

export default Environment1Sapling;
