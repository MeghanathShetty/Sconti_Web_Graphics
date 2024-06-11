import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, Plane } from '@react-three/drei';
import Model from '../Model';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { createRandomPositions, getRandomValues } from '../utils/createValues';
import { v4 as uuidv4 } from 'uuid';

function MixedEnvironment({ count }) {
    const texture = useLoader(TextureLoader, '/textures/ground2.jpg');
    const [models, setModels] = useState([]);
    const [positions, setPositions] = useState([]);
    const [treePositions, setTreePositions] = useState([]);
    const [score, setScore] = useState(-1);
    const [scoreChanged, setScoreChanged] = useState(false);
    const [grass, setGrass] = useState([]);

    function handleScore(val) {
        setScore(Number(val));
        setScoreChanged(prev => !prev); // Toggle the scoreChanged flag, to call useEffect
    }

    useEffect(() => {
        const grassPositions = createRandomPositions(4.5, 175);
        let val = getRandomValues(0.33, 0.70, grassPositions.length);
        const grassElements = grassPositions.map((pos, i) => <Model key={uuidv4()} position={pos} path={'/grass/anime_grass_2.glb'} scale = {[0.27, val[i], 0.27]}/>);
        setGrass(grassElements);
    }, []);
  
    useEffect(() => {
      if (score !== -1) {
        let position;
        if (score <= 5) {
          position = createRandomPositions(4.8, 1, positions, true, 0, 0.1);
          let scaleVal = getRandomValues(0.0018,0.0035,1);
          let sc = [scaleVal[0],scaleVal[0],scaleVal[0]];
          if(position === null)
            console.log("No more positions left");
          else {
            setModels(prev => [...prev, <Model key={uuidv4()} position={position} scale={sc} path={'/trees/coconut_tree2.glb'}/>]);
            setTreePositions(prev => [...prev, {position, scale : sc, filled : false}]);
          }
        } else if(score >5 && score <= 10) {
          position = createRandomPositions(4.8, 1, positions, true, 0, 0.2);
          if(position === null)
            console.log("No more positions left");
          else {
            setModels(prev => [...prev, <Model key={uuidv4()} position={position} scale={[0.35, 0.35, 0.35]} path={'/humans/person4.glb'}/>]);
            }
        } else if(score >10 && score <=15) {
            let filled = false;
            for(const item of treePositions) {
                if(!item.filled) {
                    const scaleRatio = item.scale[1] / 0.0020;
                    const increment = scaleRatio * 1.35;

                    const x = item.position[0];
                    const y = item.position[1] + increment;
                    const z = item.position[2];
                    setModels(prev => [...prev, <Model key={uuidv4()} position={[x,y,z]} scale={[0.002, 0.002, 0.002]} path={'/fruits_and_vegies/coconut_set.glb'}/>]);
                    item.filled = true;
                    filled = true;
                    return;
                }
            }
            if(!filled) console.log("No more trees left");
        } 
        else if(score >15 && score <= 20) {
            let val = getRandomValues(2.5,3.3,1);
            position = createRandomPositions(3.3, 1, positions, true, val[0], 0.1);
            if(position === null)
              console.log("No more positions left");
            else {
              setModels(prev => [...prev, <Model key={uuidv4()} position={position} scale={[0.1, 0.1, 0.1]} path={'/animals/bird1.glb'}/>]);
              }
          }
        else if(score >20 && score <= 25) {
          position = createRandomPositions(4.5, 1, positions, true, 0, 0.2);
          let val = getRandomValues(0.070,0.12,1);
          if(position === null)
            console.log("No more positions left");
          else {
            setModels(prev => [...prev, <Model key={uuidv4()} position={position} scale={[val[0],val[0],val[0]]} path={'/animals/cow2.glb'}/>]);
            }
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
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Environment preset='sunset' />
        <Suspense fallback={null}>
          <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <meshStandardMaterial map={texture} color='#459651'/>
          </Plane>
        {/* <Model position={[0,0,0]} scale={[1, 0.6, 1]} path={'/tables/table.glb'} /> */}
        {models}
        {grass}
        </Suspense>
      </Canvas>
    </>
  );
}

export default MixedEnvironment;