import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchbarNav.css";

function SearchBar({ placeholder, data }) {
  
  const [ toSearch,setSearch ] = useState('');
  
  const handleChange = event => {
    setSearch(event.target.value);
  };

  const Search = () => {
    console.log(toSearch)
  };

  return (
    <div className="searchNav">
      <div className="searchInputsNav">
        <input type="text" placeholder={placeholder} onChange={handleChange} value={toSearch}/>
        <Link to={`/s/${toSearch}`} className="searchIconNav">
        <div className="searchIconNav" onClick={Search}>
          {" "}
        </div>
        </Link>
      </div>
    </div>
  );
}
export default SearchBar;