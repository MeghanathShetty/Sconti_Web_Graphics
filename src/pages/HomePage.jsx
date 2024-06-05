import React, { useState, useEffect } from 'react';
import Box1 from '../components/Box1';
import { Canvas } from '@react-three/fiber';
import "../css/homepage.css";
import Environment1 from '../components/Environment1';
import Environment1Sapling from '../components/Environment1Sapling';
import CoinEnvironment from '../components/CoinEnvironment';

function HomePage() {

  return (
    <div id='main-container'>
        {/* <Box1 /> */}
        <CoinEnvironment count = {12} />
        {/* <Environment1 count={120} /> */}
        {/* <Environment1Sapling count={100} /> */}
    </div>
  );
}

export default HomePage;