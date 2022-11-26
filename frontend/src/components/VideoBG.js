import React from 'react'
import './VideoBG.css'

import libVideo from '../assets/videoBG.mp4'
import SearchBar from './Searchbar'

const VideoBG = () => {
  return (
    <div className='hero'>
      <video autoPlay loop muted id='video'>
        <source src={libVideo} type='video/mp4' />
      </video>
      <div className='content'>
        <img src={require('../assets/titleLogo.png')} alt='logo'></img>
        <p>E-book repository</p>
        <SearchBar placeholder="SEARCH <BOOK>, <COURSE CODE>"/>
      </div>
    </div>
  )
}

export default VideoBG
