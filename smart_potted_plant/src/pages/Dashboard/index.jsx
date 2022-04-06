import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SideNavBar from "../../components/SideNavBar/index";
import Home from "../../components/Home/index";
import Statistic from "../../components/Statistic/index";
import ControlPanel from "../../components/ControlPanel/";
import Schedule from "../../components/Schedule/schedule";
import "./style.css";

export default function Dashboard() {
  return (
    <div className="d-flex">
      <SideNavBar />
      <div className="col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistic" element={<Statistic />} />
          <Route path="/control-panel" element={<ControlPanel />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </div>
    </div>
  );
}
