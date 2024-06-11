import React, { useState, useEffect } from 'react';
import Box1 from '../components/Box1';
import { Canvas } from '@react-three/fiber';
import "../css/homepage.css";
import Environment1 from '../components/Environments/Environment1';
import Environment1Sapling from '../components/Environments/Environment1Sapling';
import CoinEnvironment from '../components/Environments/CoinEnvironment';
import EnvironmentApple from '../components/Environments/EnvironmentApple';
import MixedEnvironment from '../components/Environments/MixedEnvironment';
import LargeEnvironment from '../components/Environments/LargeEnvironment';

function HomePage() {

  return (
    <div id='main-container'>
        {/* <Box1 /> */}
        {/* <CoinEnvironment count = {5} /> */}
<<<<<<< HEAD
        {/* <EnvironmentApple count= {7} /> */}
        {/* <Environment1 count={125} /> */}
        <LargeEnvironment />
        {/* <MixedEnvironment count={9} /> */}
=======
        {/* <EnvironmentApple count= {4} /> */}
        {/* <Environment1 count={10} /> */}
        <MixedEnvironment count={9} />
>>>>>>> 8456fc629e6e6168d3167c804ce226b2f549fd0e
        {/* <Environment1Sapling count={9} /> */}
    </div>
  );
}

export default HomePage;