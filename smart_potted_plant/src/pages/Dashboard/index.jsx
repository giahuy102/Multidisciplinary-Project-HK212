import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import SideNavBar from "../../components/SideNavBar/";
import Home from "../../components/Home/";
import Statistic from "../../components/Statistic";
import ControlPanel from "../../components/control-panel";
import "./style.css";
const API_URL = "http://localhost:3001/api/user/";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      ledStatusData: [{ value: 0 }],
      pumpStatusData: [{ value: 0 }],
      temperatureData: [{ value: 0 }],
      humiSoilData: [{ value: 0 }],
      humiAirData: [{ value: 0 }],
      lightData: [{ value: 0 }],

      ledStatus: 0,
      pumpStatus: 0,
      temperature: 0,
      humiSoil: 0,
      humiAir: 0,
      light: 0,
    };
  }
  pullData = async () => {
    let response = await axios({
      method: "get",
      data: {},
      url: API_URL + "get-all-data",
      withCredentials: true,
    });
    await this.setState({
      temperatureData: response.data.temperature,
      humiAirData: response.data.humiAir,
      humiSoilData: response.data.humiSoil,
      lightData: response.data.light,
      ledStatusData: response.data.ledStatus,
      pumpStatusData: response.data.pumpStatus,

      temperature: response.data.temperature[0].value,
      humiAir: response.data.humiAir[0].value,
      humiSoil: response.data.humiSoil[0].value,
      light: response.data.light[0].value,
      ledStatus: response.data.ledStatus[0].value,
      pumpStatus: response.data.pumpStatus[0].value,
    });
  };
  componentDidMount = async () => {
    await this.pullData();
  };
  changeDeviceStatus = async (device) => {
    let deviceStatus = undefined;
    if (device == "led") {
      deviceStatus = !this.state.ledStatus ? 1 : 0;
      this.setState({ ledStatus: !this.state.ledStatus });
    } else if (device == "pump") {
      deviceStatus = !this.state.pumpStatus ? 1 : 0;
      this.setState({ pumpStatus: !this.state.pumpStatus });
      console.log(this.state.pumpStatus);
    }
    let response = await axios.post(API_URL + "change-device-status", {
      device: device,
      deviceStatus: deviceStatus,
    });
    if (response.status == 201) alert(response.data);
  };
  render = () => (
    <div className="d-flex">
      <SideNavBar />
      <div className="col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistic" element={<Statistic />} />
          <Route
            path="/control-panel"
            element={
              <ControlPanel
                ledStatus={this.state.ledStatus}
                pumpStatus={this.state.pumpStatus}
                temperature={this.state.temperature}
                humiAir={this.state.humiAir}
                humiSoil={this.state.humiSoil}
                light={this.state.light}
                changeDeviceStatus={this.changeDeviceStatus}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
