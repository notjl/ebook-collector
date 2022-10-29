import { Link } from "react-router-dom";
import "./NavBar.css";


const NavBar = () => {
    return(
        <nav className="nav">  
            <h1><Link style={{ color: 'black' ,textDecoration: 'none'}} to="/">&lt; L I B R A R Y &gt;</Link></h1>
            <ul id="navitems">
                <li><Link style={{textDecoration: 'none'}} to="/a">Articles</Link></li>
                <li><Link style={{textDecoration: 'none'}} to="/About">About</Link></li>
                <li><Link style={{textDecoration: 'none'}} to="/upload">Upload</Link></li>
                <li><Link style={{textDecoration: 'none'}} to="/Login">Login</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;