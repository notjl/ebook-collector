import { Link } from "react-router-dom";


const NavBar = () => {
    return(
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/a">Articles</Link></li>
                <li><Link to="/About">About</Link></li>
                <li><Link to="/upload">Upload</Link></li>
                <li><Link to="/Login">Login</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;