import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import SideNavBar from "../../components/SideNavBar/";
import Home from "../../components/Home/";
import Statistic from "../../components/Statistic";
import ControlPanel from "../../components/control-panel";
import "./style.css";
import socket from "socket.io-client";

const API_URL = "http://localhost:3001/api/user/";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ledStatusData: [{ value: "0" }],
      pumpStatusData: [{ value: "0" }],
      temperatureData: [{ value: "0" }],
      humiSoilData: [{ value: "0" }],
      humiAirData: [{ value: "0" }],
      lightData: [{ value: "0" }],

      ledStatus: "0",
      pumpStatus: "0",
      temperature: "0",
      humiSoil: "0",
      humiAir: "0",
      light: "0",
    };
    this.io = undefined;
    this.feedKey = {
      temperature: "dat_huynh/feeds/bbc-temp",
      led: "dat_huynh/feeds/bbc-led",
      pump: "dat_huynh/feeds/bbc-pump",
      humiAir: "dat_huynh/feeds/bbc-humi-air",
      humiSoil: "dat_huynh/feeds/bbc-humi-soil",
      light: "dat_huynh/feeds/bbc-light",
    };
  }
  pullData = async () => {
    let response = await axios({
      method: "get",
      data: {},
      url: API_URL + "get-all-data",
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
    this.io = socket.connect("http://localhost:3001/");
    this.io.on("new_data", (message) => {
      let feedID = message.feedID;
      let data = message.data;
      if (feedID == this.feedKey.led) {
        let newLedStatusData = [data].concat(
          this.state.ledStatusData.slice(0, -1)
        );
        return this.setState({
          ledStatus: data,
          ledStatusData: newLedStatusData,
        });
      }
      if (feedID == this.feedKey.pump) {
        let newPumpStatusData = [data].concat(
          this.state.pumpStatusData.slice(0, -1)
        );
        return this.setState({
          pumpStatus: data,
          pumpStatusData: newPumpStatusData,
        });
      }
      if (feedID == this.feedKey.temperature) {
        let newTemperatureData = [data].concat(
          this.state.temperatureData.slice(0, -1)
        );
        return this.setState({
          temperature: data,
          temperatureData: newTemperatureData,
        });
      }
      if (feedID == this.feedKey.humiAir) {
        let newHumiAirData = [data].concat(this.state.humiAir.slice(0, -1));
        return this.setState({
          humiAir: data,
          humiAirData: newHumiAirData,
        });
      }
      if (feedID == this.feedKey.humiSoil) {
        let newHumiSoilData = [data].concat(this.state.humiSoil.slice(0, -1));
        return this.setState({
          humiSoil: data,
          humiSoilData: newHumiSoilData,
        });
      }
      if (feedID == this.feedKey.light) {
        let newLightData = [data].concat(this.state.lightData.slice(0, -1));
        return this.setState({
          light: data,
          lightData: newLightData,
        });
      }
    });
  };
  changeDeviceStatus = async (device) => {
    let deviceStatus = undefined;
    if (device == "led") {
      deviceStatus = this.state.ledStatus == "0" ? "1" : "0";
      this.setState({ ledStatus: deviceStatus });
    } else if (device == "pump") {
      deviceStatus = this.state.pumpStatus == "0" ? "1" : "0";
      this.setState({ pumpStatus: deviceStatus});
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
          <Route
            path="/statistic"
            element={<Statistic temperatureData={this.state.temperatureData} />}
          />
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
