import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SideNavBar from '../../components/SideNavBar/index';
import Home from '../../components/SideNavBar/index';
import Statistic from '../../components/Statistic/index';


export default function Dashboard() {
  return (
    <div>
      <Router>
        <SideNavBar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/statistic' element={<Statistic />} />
        </Routes>
      </Router>
    </div>
  );
}
