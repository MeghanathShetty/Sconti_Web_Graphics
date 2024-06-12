import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, Plane } from '@react-three/drei';
import Model from '../Model';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { v4 as uuidv4 } from 'uuid';

function HumanEnvironment({ count }) {
  const texture = useLoader(TextureLoader, '/textures/floor.jpg');
  const [human, setHuman] = useState();
  const [btns, setBtns] = useState();

  function handleButtonClick(i) {
    return () => {
      if (i === 1) {
        setHuman(<Model key={uuidv4()} position={[0,0,0]} scale={[0.004,0.004,0.004]} path={'/humans/kid_boy1.glb'} />);
      } else if (i === 2) {
        setHuman(<Model key={uuidv4()} position={[0,0,0]} scale={[3.3,3.3,3.3]} path={'/humans/teen_boy1.glb'} />);
      } else if (i === 3) {
        setHuman(<Model key={uuidv4()} position={[0,0.7,0]} scale={[0.075,0.075,0.075]} path={'/humans/police_male1.glb'} />);
      } else if (i === 4) {
        setHuman(<Model key={uuidv4()} position={[0,0,0]} scale={[0.55,0.55,0.55]} path={'/humans/soldier_male1.glb'} />);
      }
    };
  }

  useEffect(() => {
    let btnList = [];
    for (let i = 1; i <= 4; i++) {
      btnList.push(
        <button key={uuidv4()} id={`btn${i}`} style={{ margin: '10px' }} onClick={handleButtonClick(i)}>
          Level {i}
        </button>
      );
    }
    setBtns(btnList);
  }, []);

  return (
    <>
      <div className='button-div'>
        {btns}
      </div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Environment preset='park' />
        <Suspense fallback={null}>
          <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <meshStandardMaterial map={texture} color='#FFF5E1' />
          </Plane>
          {human}
        </Suspense>
      </Canvas>
    </>
  );
}

export default HumanEnvironment;