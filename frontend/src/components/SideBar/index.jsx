import { Link } from "react-router-dom";

import './style.scss';

import logo from 'assets/logo.svg';
import map from 'assets/map.svg';
import saved from 'assets/saved.svg';
import statistics from 'assets/statistics.svg';

const SideBar = (props) => {
  return (
    <nav className="side-bar">
      <Link className="logo" to="/">
        <img src={logo} alt="logo icon"/>
      </Link>
      <div className="icons">
        <div className="icon" onClick={() => {props.setSideBarPage('map')}}>
          <img src={map} alt="map icon"/>
          <p>Map</p>
        </div>
        <div className="icon" onClick={() => {props.setSideBarPage('create')}}>
          <img src={saved} alt="saved icon"/>
          <p>Create</p>
        </div>
        <div className="icon" onClick={props.setModal}>
          <img src={statistics} alt="statistics icon"/>
          <p>Harvest Statistics</p>
        </div>
      </div>
    </nav>
  )
}

export default SideBar;