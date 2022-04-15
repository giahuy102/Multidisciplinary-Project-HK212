import { color } from "d3-color";
import { withRouter } from "../../withRouter";
import { Component } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import "./style.css";
//import "../../components/Buttons/SwitchButton"
import Switch from "../switch";
import Thermometer from "react-thermometer-component";
import GaugeChart from "react-gauge-chart";
import LiquidFillGauge from "../liquid-gauge-chart";

const API_URL = "http://localhost:3001/api/user/";
class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [parseInt(this.props.light) / 10],
      options: {
        chart: {
          height: 350,
          type: "radialBar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "17px",
              },
              value: {
                formatter: function (val) {
                  return parseInt(val * 10);
                },
                color: "#111",
                fontSize: "36px",
                show: true,
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: "round",
        },
        labels: ["Light"],
      },
    };
  }
  // on props change
  componentDidUpdate = (previousProps) => {
    if (previousProps == this.props) return;
    this.setState({
      series: [parseInt(this.props.light) / 10],
      options: {
        chart: {
          height: 350,
          type: "radialBar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "17px",
              },
              value: {
                formatter: function (val) {
                  return parseInt(val * 10);
                },
                color: "#111",
                fontSize: "36px",
                show: true,
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: "round",
        },
        labels: ["Light"],
      },
    });
  };
  liquidBorderColor = "white";
  liquidWaveColor = "#FAFAD2";
  render = () => {
    return (
      <div className="container-fluid d-flex flex-wrap background justify-content-center p-5">
        <h1 className="text-center w-100">Control panel</h1>
        <div className="w-100 justify-content-center d-flex control-box">
          <div className="form-group d-flex align-items-center w-50 justify-content-center">
            <label style={{ fontSize: 30, paddingRight: 30 }}>LED</label>
            <Switch
              value={parseInt(this.props.ledStatus)}
              onClick={() => this.props.changeDeviceStatus("led")}
              onColor="#EF476F"
              id={"switch-led"}
            />
          </div>
          <br></br>
          <div className="form-group d-flex align-items-center w-50 justify-content-center">
            <label style={{ fontSize: 30, paddingRight: 30 }}>PUMP</label>
            <Switch
              value={parseInt(this.props.pumpStatus)}
              onClick={() => this.props.changeDeviceStatus("pump")}
              onColor="#EF476F"
              id={"switch-pump"}
            />
          </div>
        </div>
        <div className="w-100 d-flex flex-wrap justify-content-between info-box p-1 align-content-center row">
          <div className="col-3 d-flex flex-wrap justify-content-center align-content-center">
            <Thermometer
              theme="dark"
              value={parseInt(this.props.temperature)}
              max="100"
              steps="1"
              format="°C"
              size="normal"
              height="250"
            />
          </div>
          <div className="col-3 d-flex flex-wrap justify-content-center align-content-center">
            <GaugeChart
              nrOfLevels={15}
              percent={parseInt(this.props.humiAir) / 100}
              textColor={"white"}
              needleColor={"lawngreen"}
              cornerRadius={100}
            />
          </div>
          <div className="col-3 d-flex flex-wrap justify-content-center align-content-center">
            {/* <GaugeChart
              nrOfLevels={20}
              percent={this.props.humiSoil / 950}
              textColor={"white"}
              needleColor={"yellow"}
            /> */}
            <LiquidFillGauge
              width={200}
              height={300}
              percent={<tspan style={{ fontSize: 50 }}></tspan>}
              value={(parseInt(this.props.humiSoil) / 900) * 100}
              notPercentValue={parseInt(this.props.humiSoil)}
              maxValue={1000}
              riseAnimation
              waveAnimation
              waveFrequency={2}
              waveAmplitude={1}
              gradient
              circleStyle={{
                fill: this.liquidBorderColor,
              }}
              waveStyle={{
                fill: this.liquidWaveColor,
              }}
              textStyle={{
                fill: color("white").toString(),
              }}
              waveTextStyle={{
                fill: color("black").toString(),
              }}
            />
          </div>
          <div className="col-3 d-flex flex-wrap justify-content-center align-content-center">
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="radialBar"
              height={300}
            />
          </div>
        </div>
        <div className="w-100 d-flex flex-wrap justify-content-between align-content-center info-box mt-3 row">
          <div className="col-3 d-flex justify-content-center h5">
            Temperature: {this.props.temperature} &#8451;
          </div>
          <div className="col-3 d-flex justify-content-center h5">
            Air Humidity: {this.props.humiAir} %
          </div>
          <div className="col-3 d-flex justify-content-center h5">
            Soil Humidity: {this.props.humiSoil}
          </div>
          <div className="col-3 d-flex justify-content-center h5">
            Light: {this.props.light} LUX
          </div>
        </div>
      </div>
    );
  };
}
export default withRouter(ControlPanel);
