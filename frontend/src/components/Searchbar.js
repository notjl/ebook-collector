import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Searchbar.css";

function SearchBar({ placeholder, data }) {
  
  const navigate = useNavigate();
  const [ toSearch,setSearch ] = useState('');
  
  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleEnter = event => {
    if (event.key === 'Enter') {
      navigate('/s/'+toSearch, {replace: false});
      window.location.reload(false);
    }
  }

  const handlePress = event => {
    navigate('/s/'+toSearch, {replace: false});
    window.location.reload(false);
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} onChange={handleChange} value={toSearch} onKeyPress={handleEnter}/>
        <Link onClick={handlePress} className="searchIcon">
        <div className="searchIcon">
          {" "}
        </div>
        </Link>
      </div>
    </div>
  );
}
export default SearchBar;