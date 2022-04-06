import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:3001/api/user/";

export default function Home() {
  const [options_temp, set_options_temp] = useState({
    stroke: {
      width: [0, 1],
    },
    title: {
      text: "Temperature",
      style: {
        fontSize: "20px",
      },
    },
    labels: [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ],
    xaxis: {
      type: { format: "hh:ss" },
      title: {
        text: "Time",
        style: {
          fontSize: "15px",
        },
      },
      labels: {
        style: {
          fontSize: "15px",
        },
      },
    },
    yaxis: [
      {
        title: {
          text: "Temperature",
          style: {
            fontSize: "15px",
          },
        },
        labels: {
          style: {
            fontSize: "15px",
          },
        },
      },
    ],
    grid: {
      show: true,
    },
    colors: [
      "#18D8D8",
      "#A9D794",
      "#46AF78",
      "#A93F55",
      "#8C5E58",
      "#2176FF",
      "#33A1FD",
      "#7A918D",
      "#BAFF29",
    ],
    chart: {
      foreColor: "white",
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: undefined,
      formatter: function (val, opts) {
        return val;
      },
      textAnchor: "middle",
      distributed: false,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: "15px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: ["black"],
      },
      background: {
        enabled: true,
        foreColor: "#fff",
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#fff",
        opacity: 0.7,
        dropShadow: {
          enabled: true,
          top: 5,
          left: 5,
          blur: 1,
          color: "#000",
          opacity: 0.45,
        },
      },
      dropShadow: {
        enabled: false,
        top: 5,
        left: 5,
        blur: 1,
        color: "#000",
        opacity: 0.45,
      },
    },
    forecastDataPoints: {
      count: 5,
      fillOpacity: 0.5,
      strokeWidth: undefined,
      dashArray: 4,
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: true,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: "dark",
      style: {
        fontSize: "13px",
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
      x: {
        show: true,
        format: "dd MMM",
        formatter: undefined,
      },
      y: {
        formatter: undefined,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
      z: {
        formatter: undefined,
        title: "Size: ",
      },
      marker: {
        show: true,
      },
      items: {
        display: "flex",
      },
      fixed: {
        enabled: false,
        position: "topRight",
        offsetX: 0,
        offsetY: 0,
      },
    },
    noData: {
      text: "No Data",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: ["white"],
        fontSize: "20px",
        fontFamily: undefined,
      },
    },
  });

  const [series_temp, set_series_temp] = useState([
    {
      type: "column",
      name: "Temperature (Celcius)",
      data: [
        32, 35, 36, 35.5, 32, 33, 34, 37.5, 32, 35, 36, 35.5, 32, 33, 34, 37.5,
        32, 35, 36, 35.5, 32, 33, 35.5, 32, 37,
      ],
    },
  ]);

  const [options_soil_moisture, set_soil_moisture] = useState({
    chart: {
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    colors: ["#77B6EA", "#545454"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      categories: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ],
      title: {
        text: "Time",
      },
    },
    yaxis: {
      title: {
        text: "Soil moisture",
      },
      min: 20,
      max: 50,
    },
  });

  const [series_soil_moisture, set_series_soil_moisture] = useState([
    {
      name: "Soil moisture (%)",
      data: [
        32, 35, 36, 35.5, 32, 33, 34, 37.5, 32, 35, 36, 35.5, 32, 33, 34, 37.5,
        32, 35, 36, 35.5, 32, 33, 35.5, 32, 37,
      ],
    },
  ]);

  const [options_light_intensity, set_options_light_intensity] = useState({
    chart: {
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      // text: 'Temperature'
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ],
    xaxis: {
      type: { format: "hh:ss" },
      title: {
        text: "Time",
      },
    },
    yaxis: [
      {
        title: {
          text: "Light Intensity",
        },
      },
    ],
    grid: {
      show: true,
    },
  });

  const [series_light_intensity, set_series_light_intensity] = useState([
    {
      type: "column",
      name: "Light Intensity (Lux)",
      data: [
        32, 35, 36, 35.5, 32, 33, 34, 37.5, 32, 35, 36, 35.5, 32, 33, 34, 37.5,
        32, 35, 36, 35.5, 32, 33, 35.5, 32, 37,
      ],
    },
  ]);

  const [options_humidity, set_humidity] = useState({
    chart: {
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    colors: ["#77B6EA", "#545454"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      categories: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ],
      title: {
        text: "Time",
      },
    },
    yaxis: {
      title: {
        text: "Humidity",
      },
      min: 20,
      max: 50,
    },
  });

  const [series_humidity, set_series_humidity] = useState([
    {
      name: "Humidity (%)",
      data: [
        32, 35, 36, 35.5, 32, 33, 34, 37.5, 32, 35, 36, 35.5, 32, 33, 34, 37.5,
        32, 35, 36, 35.5, 32, 33, 35.5, 32, 37,
      ],
    },
  ]);

  const [options_device, set_device] = useState({
    chart: {
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
      },
    },
    xaxis: {
      // type: 'datetime',
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },

    yaxis: {
      title: {
        text: "Number",
      },
    },

    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      color: "yellow",
      opacity: 1,
    },
  });

  const [series_device, set_series_device] = useState([
    {
      name: "Bulb",
      data: [44, 55, 41, 67, 22, 43, 67, 22, 43, 67, 22, 43],
    },
    {
      name: "Pump water device",
      data: [13, 23, 20, 8, 13, 27, 67, 22, 43, 67, 22, 43],
    },
  ]);

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
      {/* <button onClick={handleChart} className='btn btn-primary m-2'>Click here</button> */}

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
                  10 &#8451;
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
                  980
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
                  40%
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
                  65%
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
            <Chart
              options={options_temp}
              series={series_temp}
              type="line"
              width="980"
              height="400"
            />
          </div>

          <div style={{ paddingLeft: "145px" }}>
            <Chart
              options={options_soil_moisture}
              series={series_soil_moisture}
              type="line"
              height="400"
              width="980"
            />
          </div>

          <div style={{ paddingLeft: "145px" }}>
            <Chart
              options={options_light_intensity}
              series={series_light_intensity}
              type="line"
              width="980"
              height="400"
            />
          </div>

          <div style={{ paddingLeft: "145px" }}>
            <Chart
              options={options_humidity}
              series={series_humidity}
              type="line"
              height="400"
              width="980"
            />
          </div>

          <div style={{ paddingLeft: "145px" }}>
            <Chart
              options={options_device}
              series={series_device}
              type="bar"
              height="400"
              width="980"
            />
          </div>
        </div>
      </div>

      {/* <span>{count}</span>
            <button onClick={handleEvent} className='btn btn-primary m-2'>Click here</button> */}
      {/* {counter.map(count => 
                <Counter 
                onIncrese={(id_increase) => handleIncrese(id_increase)} 
                onDelete={(id_delete) => handleDelete(id_delete)} 
                key={count.id} 
                value={count.value} 
                id={count.id}>  
                </Counter>)} */}
    </div>
  );
}
