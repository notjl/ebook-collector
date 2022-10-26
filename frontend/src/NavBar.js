import { Link } from "react-router-dom";

const NavBar = () => {
    return(
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/a">Articles</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/upload">Upload</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;