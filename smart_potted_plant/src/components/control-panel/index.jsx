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
    this.state = {
      ledStatus: false,
      pumpStatus: false,
      temperature: 0,
      humiSoil: 0,
      humiAir: 0,
      light: 0,
    };
  }
  liquidBorderColor = "white";
  liquidWaveColor = "#FAFAD2";
  componentDidMount = async () => {
    // axios({
    //   method: "get",
    //   url: "",
    //   withCredentials: true
    // }).then((response) => {console.log(response)});
    let response = await axios({
      method: "get",
      data: {},
      url: API_URL + "get-lastest-data",
      withCredentials: true,
    });
    console.log(response);
    await this.setState({
      temperature: response.data.temperature,
      humiAir: response.data.humiAir,
      humiSoil: response.data.humiSoil,
      light: response.data.light,
      ledStatus: response.data.ledStatus,
      pumpStatus: response.data.pumpStatus,
    });
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
  render = () => {
    return (
      <div className="container-fluid d-flex flex-wrap background justify-content-center p-5">
        <h1 className="text-center w-100">Control panel</h1>
        <div className="w-100 justify-content-center d-flex control-box">
          <div className="form-group d-flex align-items-center w-50 justify-content-center">
            <label style={{ fontSize: 30, paddingRight: 30 }}>LED</label>
            <Switch
              value={this.state.ledStatus}
              onClick={() => this.changeDeviceStatus("led")}
              onColor="#EF476F"
              id={"switch-led"}
            />
          </div>
          <br></br>
          <div className="form-group d-flex align-items-center w-50 justify-content-center">
            <label style={{ fontSize: 30, paddingRight: 30 }}>PUMP</label>
            <Switch
              value={this.state.pumpStatus}
              onClick={() => this.changeDeviceStatus("pump")}
              onColor="#EF476F"
              id={"switch-pump"}
            />
          </div>
        </div>
        <div className="w-100 d-flex flex-wrap justify-content-between info-box p-1 align-content-center row">
          <div className="col-3 d-flex flex-wrap justify-content-center align-content-center">
            <Thermometer
              theme="dark"
              value={this.state.temperature}
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
              percent={this.state.humiAir / 100}
              textColor={"white"}
              needleColor={"lawngreen"}
              cornerRadius={100}
            />
          </div>
          <div className="col-3 d-flex flex-wrap justify-content-center align-content-center">
            <GaugeChart
              nrOfLevels={20}
              percent={this.state.humiSoil / 100}
              textColor={"white"}
              needleColor={"yellow"}
            />
          </div>
          <div className="col-3 d-flex flex-wrap justify-content-center align-content-center">
            <LiquidFillGauge
              width={200}
              height={300}
              percent={<tspan style={{ fontSize: 50 }}></tspan>}
              value={(this.state.light / 1000) * 100}
              notPercentValue={this.state.light}
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
            Temperature: {this.state.temperature} &#8451;
          </div>
          <div className="col-3 d-flex justify-content-center h5">
            Air Humidity: {this.state.humiAir} %
          </div>
          <div className="col-3 d-flex justify-content-center h5">
            Soil Humidity: {this.state.humiSoil} %
          </div>
          <div className="col-3 d-flex justify-content-center h5">
            Light: {this.state.light} LUX
          </div>
        </div>
      </div>
    );
  };
}
export default withRouter(ControlPanel);
