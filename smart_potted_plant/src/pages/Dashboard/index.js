import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SideNavBar from '../../components/SideNavBar/index';
import Home from '../../components/Home/index';
import Statistic from '../../components/Statistic/index';

import './style.css'

export default function Dashboard() {
  return (
    <div>
        <SideNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistic" element={<Statistic />} />
        </Routes>
        
    </div>
  );
}
