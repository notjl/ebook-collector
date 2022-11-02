import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";


const NavBar = () => {
    return(
        <nav className="nav">
            <NavLink to='/'>
                <img src={require('./components/background/titleLogo.png')} alt='logo'></img>
            </NavLink>

        <nav className="nav">  
            <h1><Link style={{ color: 'black' ,textDecoration: 'none'}} to="/">&lt; L I B R A R Y &gt;</Link></h1>
            <ul id="navitems">
                <li><Link style={{textDecoration: 'none'}} to="/a">Articles</Link></li>
                <li><Link style={{textDecoration: 'none'}} to="/about">About</Link></li>
                <li><Link style={{textDecoration: 'none'}} to="/admin">Admin</Link></li>
            </ul>
            <div class="hamburger">
                <span class='bar'></span>
                <span class='bar'></span>
                <span class='bar'></span>
                <span class='bar'></span>
            </div>
        </nav>
    );
}

export default NavBar;