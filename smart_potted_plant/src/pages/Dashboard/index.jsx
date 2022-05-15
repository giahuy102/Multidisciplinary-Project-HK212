import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import SideNavBar from "../../components/SideNavBar/";
import Home from "../../components/Home/";
import Statistic from "../../components/Statistic";
import ControlPanel from "../../components/control-panel";

import Forecasting from "../../components/Forecasting"

import "./style.css";
import socket from "socket.io-client";

import NotifyMe from '../../components/react-notification-timeline';
// import NotifyMe from 'react-notification-timeline';

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


      notificationData:  [
          // {
          //   "update":"70 new employees are s",
          //   "timestamp":1596119688264
          // },
          // {
          //   "update": "Time to Take a Break, TADA!!!",
          //   "timestamp":1596119686811
          // },
          // {
          //   "update": "Time to Take a Break, TADA!!!",
          //   "timestamp":1596119686811
          // }
      ]
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

    this.threshold = {
      temperature: {
        low: 15,
        high: 40
      },
      humiAir: {
        low: 40,
        high: 90
      }, 
      humiSoil: {
        low: 300,
        high: 700
      },
      light: {
        low: 3000,
        high: 12000
      }

    }
  }

  checkAndPushMessage = async(name, value, thres) => {
    
    if (value > thres.high || value < thres.low) {
      // console.log(1);
      let notificationData = [...this.state.notificationData];
      let newData = {
        "update": name + " value is not within the allowable threshold",
        "timestamp": Date.now()
      }
      await notificationData.push(newData);
      await this.setState({
        notificationData: notificationData
      })

    }
  }


  pullData = async () => {
    let response = await axios({
      method: "get",
      data: {},
      url: API_URL + "get-all-data",
    });

    // console.log(response.data.temperature[0].value);
    await this.setState({
      notificationData: []
    })

    this.checkAndPushMessage("Temperature", response.data.temperature[0].value, this.threshold.temperature);
    this.checkAndPushMessage("Air humidity", response.data.humiAir[0].value, this.threshold.humiAir);
    this.checkAndPushMessage("Soid humidity", response.data.humiSoil[0].value, this.threshold.humiSoil);
    this.checkAndPushMessage("Light", response.data.light[0].value, this.threshold.light);

    // console.log(response.data.humiAir);

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
      console.log(data)
      if (feedID == this.feedKey.led) {
        let newLedStatusData = [data].concat(
          this.state.ledStatusData.slice(0, -1)
        );
        return this.setState({
          ledStatus: data.value,
          ledStatusData: newLedStatusData,
        });
      }
      if (feedID == this.feedKey.pump) {
        let newPumpStatusData = [data].concat(
          this.state.pumpStatusData.slice(0, -1)
        );
        return this.setState({
          pumpStatus: data.value,
          pumpStatusData: newPumpStatusData,
        });
      }
      if (feedID == this.feedKey.temperature) {
        let newTemperatureData = [data].concat(
          this.state.temperatureData.slice(0, -1)
        );
              console.log(this.state.temperatureData);

        this.checkAndPushMessage("Temperature", data.value, this.threshold.temperature);

        return this.setState({
          temperature: data.value,
          temperatureData: newTemperatureData,
        });
      }
      if (feedID == this.feedKey.humiAir) {
        let newHumiAirData = [data].concat(this.state.humiAir.slice(0, -1));

        // console.log(newHumiAirData);
        this.checkAndPushMessage("Air humidity", data.value, this.threshold.humiAir);
        return this.setState({
          humiAir: data.value,
          humiAirData: newHumiAirData,
        });
      }
      if (feedID == this.feedKey.humiSoil) {
        let newHumiSoilData = [data].concat(this.state.humiSoil.slice(0, -1));

        this.checkAndPushMessage("Soid humidity", data.value, this.threshold.humiSoil);

        return this.setState({
          humiSoil: data.value,
          humiSoilData: newHumiSoilData,
        });
      }
      if (feedID == this.feedKey.light) {
        let newLightData = [data].concat(this.state.lightData.slice(0, -1));

        this.checkAndPushMessage("Light", data.value, this.threshold.light);

        return this.setState({
          light: data.value,
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
        <div className="top-nav-wrap">
          <div className="top-nav" style={{height: 60}}>
          <NotifyMe
            data={this.state.notificationData}
            storageKey='notific_key'
            notific_key='timestamp'
            notific_value='update'
            heading='Notification Alerts'
            sortedByKey={false}
            showDate={true}
            size={32}
            // color="blue"
            color='white'
            
          />

            {/* <h2 style={{marginBottom: 0}}>Top nav</h2> */}
            {/* <div className="line" style={{height: 1, backgroundColor: '#D2D4DD', marginTop: 20}}></div> */}
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/statistic"
            element={
              <Statistic 
              temperatureData={this.state.temperatureData} 
              soilMoisture={this.state.humiSoilData}
              lightIntensity={this.state.lightData}
              humidity={this.state.humiAirData}
              ledStatus={this.state.ledStatusData}
              pumpStatus={this.state.pumpStatusData}
              />
            }
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
                changeDeviceStatus={() => this.changeDeviceStatus}
              />
            }
          />
          <Route path="/forecasting" element={<Forecasting />} />
        </Routes>
      </div>
    </div>
  );
}