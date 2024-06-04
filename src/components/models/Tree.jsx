import React, { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const TreeModel = ({ position = [0,0,0] , scale = [0.17, 0.25, 0.17] }) => {
  const [gltf, setGltf] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/models/trees/coconut_tree.glb", (loadedGltf) => {
      setGltf(loadedGltf);
    });
  }, []);

  return (
    <>
      {gltf && <primitive object={gltf.scene} position={position} scale={scale}/>}
    </>
  );
};

export default TreeModel;
