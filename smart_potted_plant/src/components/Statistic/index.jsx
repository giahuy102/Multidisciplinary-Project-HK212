import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { useState } from "react";
import Temperature from "./temperature";
import SoilMoisture from "./soi_moisture";
import LightIntensity from "./light_intensity";
import Humidity from "./humidity";
import Device from "./device";


export default function Home(props) {

  const each_param_block = {
    backgroundColor: "#d7e2e9",
    border: "1px solid #d7e2e9",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    width: "300px",
    padding: "10px",
    boxShadow: "3px 3px #c3d0cd",
    color: "black",
  };

  return (
    <div className="background">

      <div
        style={{ backgroundColor: "rgba(0,0,0,0.1)", textAlign: "center" }}
        className="header"
      >
        <p style={{ fontSize: "40px", fontWeight: "bold" }}>Statistic</p>
      </div>

      <div className="container">
        <div className="row">
          <h2 style={{ fontWeight: "bold", color: "#15bc31" }}>Overview</h2>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="four-params"
          >
            <div style={each_param_block} className="param">
              <div>
                <img
                  style={{ width: "30%", paddingTop: "10px" }}
                  src={require("./images/thermometer.png")}
                  alt=""
                />
              </div>
              <div style={{ width: "417px" }}>
                <span style={{ fontSize: "20px", fontWeight: "light" }}>
                  Temperature
                </span>{" "}
                <br></br>
                <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                  {props.temperatureData[0].value} &#8451;
                </span>
              </div>
            </div>
            <div style={each_param_block} className="param">
              <div>
                <img
                  style={{ width: "30%", paddingTop: "10px" }}
                  src={require("./images/sunny.png")}
                  alt=""
                />
              </div>
              <div style={{ width: "417px" }}>
                <span style={{ fontSize: "20px", fontWeight: "light" }}>
                  Light Intensity
                </span>{" "}
                <br></br>
                <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                  {props.lightIntensity[0].value} LUX
                </span>
              </div>
            </div>
            <div style={each_param_block} className="param">
              <div>
                <img
                  style={{ width: "30%", paddingTop: "10px" }}
                  src={require("./images/soil.png")}
                  alt=""
                />
              </div>
              <div style={{ width: "417px" }}>
                <span style={{ fontSize: "20px", fontWeight: "light" }}>
                  Soil Moisture
                </span>{" "}
                <br></br>
                <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                  {props.soilMoisture[0].value}
                </span>
              </div>
            </div>
            <div style={each_param_block} className="param">
              <div>
                <img
                  style={{ width: "30%", paddingTop: "10px" }}
                  src={require("./images/drop.png")}
                  alt=""
                />
              </div>
              <div style={{ width: "417px" }}>
                <span style={{ fontSize: "20px", fontWeight: "light" }}>
                  Humidity
                </span>{" "}
                <br></br>
                <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                  {props.humidity[0].value} %
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="row temperature-statistic"
          style={{ marginTop: "50px" }}
        >
          <h2 style={{ fontWeight: "bold", color: "#15bc31" }}>More</h2>

          <div style={{ paddingLeft: "145px" }}>
            <Temperature temperatureData = {props.temperatureData}/>
          </div>

          <div style={{ paddingLeft: "145px" }}>
            <SoilMoisture soilMoisture = {props.soilMoisture} />
          </div>

          <div style={{ paddingLeft: "145px" }}>
            <LightIntensity lightIntensity = {props.lightIntensity}/>
          </div>

          <div style={{ paddingLeft: "145px" }}>
            <Humidity humidity = {props.humidity}/>
          </div>

          <div style={{ paddingLeft: "145px" }}>
            <Device ledStatus = {props.ledStatus} pumpStatus = {props.pumpStatus}/>
            {/* <Chart
              options={options_device}
              series={series_device}
              type="bar"
              height="400"
              width="980"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
