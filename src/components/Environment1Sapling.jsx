import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, Plane } from '@react-three/drei';
import TreeModel from './models/TreeModel';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { createRandomPositions, createLinearPositions } from './utils/createPositions';
import GrassModel from './models/GrassModel';
import TreeSaplingModel from './models/TreeSapling';
import { v4 as uuidv4 } from 'uuid';

function Environment1Sapling({ count = -1 }) {
  const texture = useLoader(TextureLoader, '/textures/ground1.jpg');
  const [trees, setTrees] = useState([]);
  const [treePositions, setTreePositions] = useState([]);
  const [grass, setGrass] = useState([]);
  const [score, setScore] = useState(-1);
  const [scoreChanged, setScoreChanged] = useState(false);

  function handleScore(val) {
    setScore(Number(val));
    setScoreChanged(prev => !prev); // Toggle the scoreChanged flag, to call useEffect
  }

  useEffect(() => {
    const grassPositions = createRandomPositions(4.2, 75);
    const grassElements = grassPositions.map(pos => <GrassModel key={uuidv4()} position={pos} />);
    setGrass(grassElements);
  }, []);

  useEffect(() => {
    if (count !== -1) {
      const positions = createLinearPositions(4.8, count);
      console.log(positions);
      setTreePositions(positions);
    }
  }, [count]);

  useEffect(() => {
    if (treePositions.length !== 0) {
      const treeElements = treePositions.map(pos => <TreeModel key={uuidv4()} position={pos} />);
      setTrees(treeElements);
    }
  }, [treePositions]);

  useEffect(() => {
    if (score !== -1) {
      let position;
      if (score > 7) {
        position = createLinearPositions(4.8, 1, treePositions, true);
        setTrees(prevTrees => [...prevTrees, <TreeModel key={uuidv4()} position={position} />]);
      } else {
        position = createLinearPositions(4.8, 1, treePositions, true);
        setTrees(prevTrees => [...prevTrees, <TreeSaplingModel key={uuidv4()} position={position} />]);
      }
    }
  }, [score, scoreChanged]);

  return (
    <>
      <input
        type='number'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleScore(e.target.value);
            e.target.value = '';
          }
        }}
      />
      <Canvas>
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Environment preset='sunset' />
        <Suspense fallback={null}>
          <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <meshStandardMaterial map={texture} color='#d18b86' />
          </Plane>
          {grass}
          {trees}
        </Suspense>
      </Canvas>
    </>
  );
}

export default Environment1Sapling;
