import React, { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const GrassModel = ({ position = [0,0,0] , scale = [0.4, 0.4, 0.4] }) => {
  const [gltf, setGltf] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/models/grass/anime_grass_2.glb", (loadedGltf) => {
      setGltf(loadedGltf);
    });
  }, []);

  return (
    <>
      {gltf && <primitive object={gltf.scene} position={position} scale={scale}/>}
    </>
  );
};

export default GrassModel;
