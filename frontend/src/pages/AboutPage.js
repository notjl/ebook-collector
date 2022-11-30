import React from 'react';

import ImageBG from '../components/ImageBG';
import Navbar from '../components/Navbar';
import Cards from '../components/AboutCards';

const Aboutpage = () => {
  return (
    <div>
        <Navbar />
        <ImageBG heading='ABOUT THE PROJECT'/>
        <Cards />
    </div>
  )
}

export default Aboutpage
