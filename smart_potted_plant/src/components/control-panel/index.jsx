import { color } from "d3-color";
import { withRouter } from "../../withRouter";
import { Component } from "react";
import axios from "axios";
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
  }
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
              value={this.props.ledStatus}
              onClick={() => this.props.changeDeviceStatus("led")}
              onColor="#EF476F"
              id={"switch-led"}
            />
          </div>
          <br></br>
          <div className="form-group d-flex align-items-center w-50 justify-content-center">
            <label style={{ fontSize: 30, paddingRight: 30 }}>PUMP</label>
            <Switch
              value={this.props.pumpStatus}
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
              value={this.props.temperature}
              max="100"
              steps="1"
              format="°C"
              size="normal"
              height="250"
            />
          </div>
          <div className="col-3 d-flex flex-wrap justify-content-center align-content-center">
            <GaugeChart
              nrOfLevels={10}
              percent={this.props.humiAir / 100}
              textColor={"white"}
              needleColor={"lawngreen"}
              cornerRadius={100}
            />
          </div>
          <div className="col-3 d-flex flex-wrap justify-content-center align-content-center">
            <GaugeChart
              nrOfLevels={20}
              percent={this.props.humiSoil / 100}
              textColor={"white"}
              needleColor={"yellow"}
            />
          </div>
          <div className="col-3 d-flex flex-wrap justify-content-center align-content-center">
            <LiquidFillGauge
              width={200}
              height={300}
              percent={<tspan style={{ fontSize: 50 }}></tspan>}
              value={(this.props.light / 1000) * 100}
              notPercentValue={this.props.light}
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
        </div>
        <div className="w-100 d-flex flex-wrap justify-content-between align-content-center info-box mt-3 row">
          <div className="col-3 d-flex justify-content-center h5">
            Temperature: {this.props.temperature} &#8451;
          </div>
          <div className="col-3 d-flex justify-content-center h5">
            Air Humidity: {this.props.humiAir} %
          </div>
          <div className="col-3 d-flex justify-content-center h5">
            Soil Humidity: {this.props.humiSoil} %
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
