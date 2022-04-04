import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SideNavBar from "../../components/SideNavBar/";
import Home from "../../components/Home/";
import Statistic from "../../components/Statistic/";
import ControlPanel from "../../components/control-panel";
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
        </Routes>
      </div>
    </div>
  );
}
