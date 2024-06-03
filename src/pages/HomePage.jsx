import React, { useState, useEffect } from 'react';
import Box1 from '../components/Box1';
import { Canvas } from '@react-three/fiber';
import "../css/homepage.css";
import Environment1 from '../components/Environment1';

function HomePage() {

  return (
    <div id='main-container'>
        {/* <Box1 /> */}
        <Environment1 />
    </div>
  );
}

export default HomePage;