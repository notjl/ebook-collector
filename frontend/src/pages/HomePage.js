import ConnectionTest from "../components/ConnectionTest";
import Searchbar from "../components/Searchbar";
import "./HomePage.css";

const HomePage = () => {
    return (
        <>
        <div className="search">
            <Searchbar placeholder="SEARCH <BOOK>, <COURSE CODE>" />
        </div>
        <ConnectionTest/>
        </>
    )
}

export default HomePage;