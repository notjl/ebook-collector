import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./searchbar.css";
import SearchIcon from "@mui/icons-material/Search"; //add material-ui/utils

function SearchBar({ placeholder, data }) {
  
  const [ toSearch,setSearch ] = useState('');

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const Search = () => {
    console.log(toSearch)
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} onChange={handleChange} value={toSearch}/>
        <Link to={`/s/${toSearch}`} className="searchIcon">
        <div className="searchIcon" onClick={Search}>
          {" "}
          <SearchIcon style={{color: 'black' }} /> {" "}
        </div>
        </Link>
      </div>
      <div className="dataResults"></div>
    </div>
  );
}
export default SearchBar;