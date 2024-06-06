import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, Plane } from '@react-three/drei';
import Model from '../Model';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { createRandomPositions, getRandomValues } from '../utils/createValues';
import { v4 as uuidv4 } from 'uuid';

function EnvironmentApple({ count }) {
  const texture = useLoader(TextureLoader, '/textures/ground2.jpg');
  const [apple, setApple] = useState([]);
  const [applePositions, setApplePosition] = useState([]);
  const [grass, setGrass] = useState([]);
  const [score, setScore] = useState(-1);
  const [scoreChanged, setScoreChanged] = useState(false);

  function handleScore(val) {
    setScore(Number(val));
    setScoreChanged(prev => !prev); // Toggle the scoreChanged flag, to call useEffect
  }

  useEffect(() => {
    const grassPositions = createRandomPositions(3.9,100);
    const grassElements = grassPositions.map(pos => <Model key={uuidv4()} position={pos} scale={[0.03,0.04,0.03]} path={'/grass/grass_05.glb'} color="#00FF00"/>);
    setGrass(grassElements);
  }, []);

  useEffect(() => {
      const positions = createRandomPositions(1, count, [], false, 3.1,0.6);
      setApplePosition(positions);
  }, [count]);

  useEffect(() => {
    if (applePositions.length !== 0) {
      let val = getRandomValues(0.5,0.8,applePositions.length);
      const appleElements = applePositions.map((pos, i) => <Model key={uuidv4()} position={pos} scale={[val[i], val[i], val[i]]} path={'/apple/low_poly_apple_game_ready.glb'} />);
      setApple(appleElements);
    }
  }, [applePositions]);

  useEffect(() => {
    if (score !== -1) {
      let position;
      if (score > 7) {
        position = createRandomPositions(1, 1, applePositions, true,3.1,0.5);
        if(position === null)
          console.log("No more positions left");
        else
          setApple(prevapple => [...prevapple, <Model key={uuidv4()} position={position} scale = {[0.8, 0.8, 0.8]} path={'/apple/low_poly_apple_game_ready.glb'} />]);
      } else {
        position = createRandomPositions(1, 1, applePositions, true,3.3,0.5);
        if(position === null)
          console.log("No more positions left");
        else
          setApple(prevapple => [...prevapple, <Model key={uuidv4()} position={position} scale = {[0.006, 0.006, 0.006]} path={'/orange/orange.glb'} />]);
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
        <Environment preset='park' />
        <Suspense fallback={null}>
          <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <meshStandardMaterial map={texture} color="#808836"/>
          </Plane>
          <Model position={[0,0,0]} scale = {[5, 4, 5]} path={'/table/picnic_table_-_low_poly.glb'} />
          {apple}
          {grass}
        </Suspense>
      </Canvas>
    </>
  );
}

export default EnvironmentApple;