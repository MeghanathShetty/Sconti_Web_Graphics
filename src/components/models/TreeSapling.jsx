import React, { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const TreeSaplingModel = ({ position = [0,0,0] , scale = [0.0017, 0.0023, 0.0017] }) => {
  const [gltf, setGltf] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/models/trees/treesapling.glb", (loadedGltf) => {
      setGltf(loadedGltf);
    });
  }, []);

  return (
    <>
      {gltf && <primitive object={gltf.scene} position={position} scale={scale}/>}
    </>
  );
};

export default TreeSaplingModel;