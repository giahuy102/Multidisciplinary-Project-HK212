import React, { useState } from "react";

// ICONS
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import { IconContext } from "react-icons";

// ROUTING

import { Link } from "react-router-dom";

import "./style.css";

import Statistic from '../Statistic'

export default function SideNavBar() {
  const [active, setActive] = useState(true);
  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <nav className={active ? "nav-bar" : "nav-bar nav-bar-inactive"}>
        
        <img src={require("../../assets/images/logo.png")}></img>
        <Link
          className="transition-button"
          to="#"
          onClick={() => setActive(!active)}
        >
          <FaIcons.FaBars className="fabar-icon" />
        </Link>
        <ul>
          <li>
            <Link to="/">
              <AiIcons.AiFillHome className="icon" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/statistic">
              <AiIcons.AiOutlineBarChart className="icon" />
              <span>Statistic</span>
            </Link>
          </li>
          <li>
            <Link to="/control-panel">
              <AiIcons.AiOutlineTool className="icon" />
              <span>Control Panel</span>
            </Link>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}
