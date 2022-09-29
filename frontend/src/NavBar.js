import { Link } from "react-router-dom";


const NavBar = () => {
    return(
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/About">About</Link></li>
                <li><Link to="/Articles">Articles</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;