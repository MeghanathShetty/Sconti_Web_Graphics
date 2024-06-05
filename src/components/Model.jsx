import React, { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ position = [0,0,0] , scale = [0.17, 0.25, 0.17] , path = '/trees/coconut_tree.glb', rotate=[0, 0, 0]}) => {
  const [gltf, setGltf] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(`/models${path}`, (loadedGltf) => {
      setGltf(loadedGltf);
    });
  }, []);

  return (
    <>
      {gltf && <primitive object={gltf.scene} position={position} scale={scale} rotation={rotate}/>}
    </>
  );
};

export default Model;
