import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa'

import './Navbar.css'
import Searchbar from './SearchbarNav'

const Navbar = () => {
    const[click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

  return (
    <div className='header'>
        <div className='logo'>
            <Link to = '/'><img src={require('./assets/iconNB.png')} alt='logo'></img></Link>
        </div>
        <Searchbar/>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li>
                <Link style={{textDecoration: 'none'}} to = '/about'>About</Link>
            </li>
            <li>
                <Link style={{textDecoration: 'none'}} to = '/a'>E-Books</Link>
            </li>
            <li>
                <Link style={{textDecoration: 'none'}} to = '/admin/upload'>Admin</Link>
            </li>
        </ul>
        <div className='hamburger' onClick={handleClick}>
        {click ? (<FaTimes size={30} style={{color: '#000000'}}/>) : (<FaBars size={30} style={{color: '#000000'}}/>)} 
            
        </div>
    </div>
  )
}

export default Navbar
