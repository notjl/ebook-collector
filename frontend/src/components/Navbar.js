import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa'

import './Navbar.css'

const Navbar = () => {
    const[click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

  return (
    <div className='header'>
        <Link to = '/'><img src={require('./assets/iconNB.png')} alt='logo'></img></Link>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li>
                <Link to = '/about'>About</Link>
            </li>
            <li>
                <Link to = '/a'>E-Books</Link>
            </li>
            <li>
                <Link to = '/admin'>Admin</Link>
            </li>
        </ul>
        <div className='hamburger' onClick={handleClick}>
        {click ? (<FaTimes size={30} style={{color: '#000000'}}/>) : (<FaBars size={30} style={{color: '#000000'}}/>)} 
            
        </div>
    </div>
  )
}

export default Navbar
