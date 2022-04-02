import { withRouter } from "../../withRouter";
import { Component } from "react";
import axios from "axios";
import "./style.css";
//import "../../components/Buttons/SwitchButton"
import { Switch } from "react-native";
import { Temperature} from "react-environment-chart";
import GaugeChart from "react-gauge-chart";

const API_URL = "http://localhost:3001/api/user/";
class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ledStatus: false,
      pumpStatus: false,
      temparature: 35,
      humiSoil: 30,
      humiAir: 40,
    };
  }
  componentDidMount = async () => {
    // axios({
    //   method: "get",
    //   url: "",
    //   withCredentials: true
    // }).then((response) => {console.log(response)});
    let response = await axios({
      method: "get",
      data: {},
      url: API_URL + "get-data",
      withCredentials: true,
    });
    this.setState({
      temparature: response.temparature,
      ledStatus: response.ledStatus,
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
              style={{ height: 50 }}
            />
          </div>
          <br></br>
          <div className="form-group d-flex align-items-center w-50 justify-content-center">
            <label style={{ fontSize: 30, paddingRight: 30 }}>PUMP</label>
            <Switch
              value={this.state.pumpStatus}
              onClick={() => this.changeDeviceStatus("pump")}
              style={{ height: 50 }}
            />
          </div>
        </div>
        <div className="w-100 d-flex flex-wrap justify-content-between info-box p-1 align-content-center">
          <div className="w-25 d-flex justify-content-center">
            <Temperature value={this.state.temparature} height={300} />
          </div>
          <div className="w-25 d-flex flex-wrap justify-content-center mt-5">
            <GaugeChart
              nrOfLevels={20}
              percent={this.state.humiAir / 100}
              textColor={"black"}
            />
          </div>
          <div className="w-25 d-flex flex-wrap justify-content-center mt-5">
            <GaugeChart
              nrOfLevels={20}
              percent={this.state.humiSoil / 100}
              textColor={"black"}
            />
          </div>
        </div>
        <div className="w-100 d-flex flex-wrap justify-content-between info-box">
          <div className="w-25 d-flex justify-content-center h5">
            Temperature: {this.state.temparature} &#8451;
          </div>
          <div className="w-25 d-flex justify-content-center h5">
            Air Humidity: {this.state.humiAir} %
          </div>
          <div className="w-25 d-flex justify-content-center h5">
            Soil Humidity: {this.state.humiSoil} %
          </div>
        </div>
      </div>
    );
  };
}
export default withRouter(ControlPanel);
