import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, Plane } from '@react-three/drei';
import Model from '../Model';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { createRandomPositions, createLinearPositionsYAxis } from '../utils/createValues';
import { v4 as uuidv4 } from 'uuid';

function CoinEnvironment({ count }) {
    const texture = useLoader(TextureLoader, '/textures/floor_granite.jpg');
    const [coins, setCoins] = useState([]);
    const [coinPositions, setCoinPositions] = useState([]);
    const [score, setScore] = useState(-1);
    const [scoreChanged, setScoreChanged] = useState(false);

    function handleScore(val) {
        setScore(Number(val));
        setScoreChanged(prev => !prev); // Toggle the scoreChanged flag, to call useEffect
    }

    useEffect(() => {
        const positions = createLinearPositionsYAxis(1, count);
        setCoinPositions(positions);
    }, [count]);
  
    useEffect(() => {
      if (coinPositions.length !== 0) {
        const coinElements = coinPositions.map((pos) => <Model key={uuidv4()} position={pos} scale={[0.06, 0.06, 0.06]} path={'/coins/coin3.glb'} rotate={[Math.PI / 2, 0, 0]}/>);
        setCoins(coinElements);
      }
    }, [coinPositions]);
  
    useEffect(() => {
      if (score !== -1) {
        let position;
        if (score > 7) {
          position = createLinearPositionsYAxis(1, 1, coinPositions, true);
          if(position === null)
            console.log("No more positions left");
          else
            setCoins(prevCoins => [...prevCoins, <Model key={uuidv4()} position={position} scale={[0.06, 0.06, 0.06]} path={'/coins/coin3.glb'} rotate={[Math.PI / 2, 0, 0]}/>]);
        } else {
          position = createLinearPositionsYAxis(1, 1, coinPositions, true);
          if(position === null)
            console.log("No more positions left");
          else
            setCoins(prevCoins => [...prevCoins, <Model key={uuidv4()} position={position} scale={[0.06, 0.06, 0.06]} path={'/coins/coin3.glb'} rotate={[Math.PI / 2, 0, 0]}/>]);
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
            <meshStandardMaterial map={texture} />
          </Plane>
        <Model position={[0,0,0]} scale={[1, 0.6, 1]} path={'/tables/table.glb'} />
        {coins}
        </Suspense>
      </Canvas>
    </>
  );
}

export default CoinEnvironment;