import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, Plane } from '@react-three/drei';
import Model from '../Model';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { createRandomPositions, createRandomPositionsSecluded, getRandomValues } from '../utils/createValues';
import { v4 as uuidv4 } from 'uuid';

function LargeEnvironment({ count }) {
    const texture = useLoader(TextureLoader, '/textures/ground2.jpg');
    const [cows, setCows] = useState([]);
    const [cowPositions, setCowPositions] = useState([]);
    const [score, setScore] = useState(-1);
    const [scoreChanged, setScoreChanged] = useState(false);
    const [barnSet, setBarnSet] = useState([]);
    const [tractorSet, setTractorSet] = useState([]);
    const [crops, setCrops] = useState([]);
    const [cropData, setCropData] = useState([]);
    const [cropFruit, setCropFruit] = useState([]);
    const [grassRocks, setGrassRocks] = useState([]);
    const [tractors, setTractors] = useState([]);
    const [tractorData, setTractorData] = useState([]);

    useEffect(() => {
      let val;
      const grassPositions = createRandomPositions(21.5, 175);
      val = getRandomValues(0.7, 1.3, grassPositions.length);
      const grassElements = grassPositions.map((pos, i) => <Model key={uuidv4()} position={pos} path={'/grass/anime_grass_2.glb'} scale = {[1.7, val[i], 1.7]}/>);
      setGrassRocks(grassElements);

      const rocksPositions = createRandomPositions(21.5, 25);
      val = getRandomValues(0.3, 0.7, rocksPositions.length);
      const rocksElements = rocksPositions.map((pos, i) => <Model key={uuidv4()} position={pos} path={'/rocks/small_rocks1.glb'} scale = {[val[i],val[i],val[i]]}/>);
      setGrassRocks(prev => [ ...prev, rocksElements]);
    }, []);


    function handleScore(val) {
        setScore(Number(val));
        setScoreChanged(prev => !prev); // Toggle the scoreChanged flag, to call useEffect
    }

    const replaceModelByIndex = (index, setModelList, newElement) => {
      setModelList(prev => prev.map((el, i) => i === index ? newElement : el));
    };

    useEffect(()=>{
      setBarnSet([
        // bush
        <Model key={uuidv4()} position={[-18,0,7]} scale={[2,2,2]} path={'/nature/bush1.glb'} rotate={[0, 0, 0]}/>,
        <Model key={uuidv4()} position={[-22,0,5]} scale={[2,2,2]} path={'/nature/bush1.glb'} rotate={[0, 0, 0]}/>,
        <Model key={uuidv4()} position={[-14,0,5]} scale={[2,2,2]} path={'/nature/bush1.glb'} rotate={[0, 0, 0]}/>,
        // hay
        <Model key={uuidv4()} position={[-22,0,23]} scale={[1,1,1]} path={'/farm/hay1.glb'} rotate={[0, 3.6, 0]}/>,
        <Model key={uuidv4()} position={[-23,0,18]} scale={[1,1,1]} path={'/farm/hay1.glb'} rotate={[0 ,Math.PI/2, 0]}/>,
        // tree
        <Model key={uuidv4()} position={[-22,0,23]} scale={[1,1,1]} path={'/trees/tree1.glb'} />,
        <Model key={uuidv4()} position={[-22,0,5]} scale={[1,1.2,1]} path={'/trees/tree2.glb'} />,
        <Model key={uuidv4()} position={[-18,0,5]} scale={[1,0.9,1]} path={'/trees/tree2.glb'} />,
        <Model key={uuidv4()} position={[-14,0,5]} scale={[1,1.3,1]} path={'/trees/tree2.glb'} />,
        <Model key={uuidv4()} position={[-10,0,5]} scale={[1,1.1,1]} path={'/trees/tree2.glb'} />,
        // trough
        <Model key={uuidv4()} position={[-2,0.7,18]} scale={[1.5,1.5,1.5]} path={'/farm/trough1.glb'} rotate={[0 , Math.PI/2, 0]}/>,
        <Model key={uuidv4()} position={[-2,0.7,14.5]} scale={[1.5,1.5,1.5]} path={'/farm/trough1.glb'} rotate={[0 , Math.PI/2, 0]}/>,
        // rocks
        <Model key={uuidv4()} position={[-22,0,9]} scale={[0.7,0.5,0.7]} path={'/rocks/rock1.glb'} rotate={[0 , Math.PI/2, 0]}/>,
        // fences
        <Model key={uuidv4()} position={[-19.0,0.7,7]} path={'/farm/wood_fence2.glb'} scale = {[0.19, 0.15, 0.15]}/>,
        <Model key={uuidv4()} position={[-11.7,0.7,7]} path={'/farm/wood_fence2.glb'} scale = {[0.10, 0.15, 0.15]}/>,
        <Model key={uuidv4()} position={[-3.1,0.7,7]} path={'/farm/wood_fence2.glb'} scale = {[0.075, 0.15, 0.15]}/>,
        <Model key={uuidv4()} position={[0,1.1,12.1]} path={'/farm/wood_fence2.glb'} scale = {[0.20, 0.15, 0.15]} rotate={[Math.PI / 2, Math.PI / 2, Math.PI / 2]}/>,
        <Model key={uuidv4()} position={[0,1.1,21.1]} path={'/farm/wood_fence2.glb'} scale = {[0.13, 0.15, 0.15]} rotate={[Math.PI / 2, Math.PI / 2, Math.PI / 2]}/>
    ])
    },[]);
    
    useEffect(()=>{
      setTractorSet([
        // bush
        <Model key={uuidv4()} position={[0.2,0,19]} scale={[2,2,2]} path={'/nature/bush1.glb'} rotate={[0, Math.PI/2, 0]}/>,
        // shed
        <Model key={uuidv4()} position={[2.8,0,12]} path={'/farm/shed1.glb'} scale = {[0.5, 1, 0.5]} rotate={[0 , Math.PI, 0]}/>,
        // fences
        <Model key={uuidv4()} position={[3.1,0.7,7]} path={'/farm/wood_fence2.glb'} scale = {[0.13, 0.15, 0.15]}/>,
        <Model key={uuidv4()} position={[19.7,0.7,7]} path={'/farm/wood_fence2.glb'} scale = {[0.17, 0.15, 0.15]}/>
    ])
    },[]);

    useEffect(() => {
      if (score !== -1) {
        let position;
        if (score <= 5) { // cows
          position = createRandomPositionsSecluded(-2.5, -21, 8, 23.5, 0, 1, cowPositions, true, 3, false, 275);
          let val = getRandomValues(0.30,0.50,1);
          let r = getRandomValues(0,3.14,1);
          if(position === null)
            console.log("No more cowPositions left");
          else {
            setCows(prev => [...prev, <Model key={uuidv4()} position={position} scale={[val[0],val[0],val[0]]} path={'/animals/cow2.glb'} rotate={[ 0, r[0], 0]}/>]);
            }
        } else if(score > 5 && score <=10) { // crops
          let tempX = -23;
          let tempZ = 6;
          if(cropData.length !== 0) { // check if there is an crop already placed
            let prevLastPosition = cropData[cropData.length - 1];
            tempX = prevLastPosition.position[0];
            tempZ = prevLastPosition.position[2];
          }
          if(tempZ <= -19) { // 5th tree, so reset Z and increase X
            tempX += 5;
            tempZ = 6;
          }
          tempZ -= 5;

          position = [tempX, 0, tempZ];
          let scaleVal = getRandomValues(0.010,0.015,1);
          let sc = [scaleVal[0],scaleVal[0],scaleVal[0]];
          if(position === null)
            console.log("No more cowPositions left");
          else {
            setCrops(prev => [...prev, <Model key={uuidv4()} position={position} scale={sc} path={'/trees/coconut_tree2.glb'}/>]);
            setCropData(prev => [...prev, {position, scale : sc, filled : false}]);
          }
        } else if(score >10 && score <=15) {
          let filled = false;
          for(const item of cropData) {
              if(!item.filled) {
                  const scaleRatio = item.scale[1] / 0.0020;
                  const increment = scaleRatio * 1.37;

                  const x = item.position[0];
                  const y = item.position[1] + increment;
                  const z = item.position[2];
                  setCropFruit(prev => [...prev, <Model key={uuidv4()} position={[x,y,z]} scale={[0.007, 0.007, 0.007]} path={'/fruits_and_vegies/coconut_set.glb'}/>]);
                  item.filled = true;
                  filled = true;
                  return;
              }
          }
          if(!filled) console.log("No more crops left");
      } else if (score > 15 && score <=20) { // tractor
          if(tractorData.length < 10) {
            let tempX = 21;
            let tempZ = 27;
            if(tractorData.length !== 0) { // check if there is an crop already placed
              let prevLastPosition = tractorData[tractorData.length - 1];
  
              tempX = prevLastPosition.position[0];
              tempZ = prevLastPosition.position[2];
            }
            if(tempZ <= 10) { // 5th tractor, so reset Z and increase X
              tempX -= 6;
              tempZ = 27;
            }
            tempZ -= 6;
  
            position = [tempX, 0, tempZ];
            if(position === null)
              console.log("No more tractor positions left");
            else {
              setTractors(prev => [...prev, <Model key={uuidv4()} position={position} scale={[0.011, 0.011, 0.011]} path={'/farm/tractor2.glb'} rotate={[ 0, 1.1, 0]}/>]);
              setTractorData(prev => [...prev, {position, replaced : false} ]);
            }
          } else {
            let replaced = false;
            let index = 0;
            for(const item of tractorData) {
              if(!item.replaced) {
                replaceModelByIndex(index, setTractors,
                   <Model key={uuidv4()} position={item.position} scale={[0.25, 0.25, 0.25]} path={'/farm/tractor1.glb'} rotate={[0, 4.1, 0]}/>
                );
                item.replaced = true;
                replaced = true;
                return;
              }
              index++;
            }
          if(!replaced) console.log("No more tractors left to replace");
          }
        }
      }
    },[score, scoreChanged]);

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
          <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <meshStandardMaterial map={texture} color='#459651'/>
          </Plane>

          {/* testing */}
          {/* <Model key={uuidv4()} position={[-24,0,8]} scale={[0.01,0.01,0.01]} path={'/trees/coconut_tree2.glb'}/> */}
          {grassRocks}

          

          {barnSet}
          {cows}

          {tractorSet}
          {tractors}

          {crops}
          {cropFruit}
        </Suspense>
      </Canvas>
    </>
  );
}

export default LargeEnvironment;