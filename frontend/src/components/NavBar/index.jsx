import { useState } from 'react';
import { Link } from "react-router-dom";

import './style.scss';
import search from 'assets/search.svg';

const NavBar = () => {
  
  const [farmName, setFarmName] = useState("Falcons: Expo 2023");

  const onNameChange = (e) => {
    setFarmName(e.target.value);
  }

  return (
    <div className="nav-bar">
      <div className="logo">
        <Link to="/">
          drishti
        </Link>
      </div>
      <input className="name-input" value={farmName} onChange={onNameChange}/>
      <div className="search-bar">
        <img src={search} alt="search icon"/>
        <input placeholder="Search for location"/>
      </div>
    </div>
  )
}

export default NavBar;