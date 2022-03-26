import { withRouter } from "../../withRouter";
import { Component } from "react";
import axios from "axios";

//import "../../components/Buttons/SwitchButton"
import { Switch} from "react-native";
const API_URL = "http://localhost:3001/api/user/";
class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ledStatus: false,
      temparature: 0,
      humiSoil: 0,
      humiAir: 0,
    };
  }
  componentDidMount = async () => {
    // axios({
    //   method: "get",
    //   url: "",
    //   withCredentials: true
    // }).then((response) => {console.log(response)});
  //   let response = await axios({
  //     method: "get",
  //     data: {},
  //     url: API_URL + "get-data",
  //     withCredentials: true,
  //   });
  //   console.log(response);
  };

  render = () => {
    return (
      <div>
        <h1 className="text-center w-100">Control panel</h1>
        <div className="form-group d-flex align-items-center">
          <label style = {{fontSize: 30}}>LED</label>
          <Switch
            value={this.state.ledStatus}
            onClick={() => this.setState({ ledStatus: !this.state.ledStatus })}
            style = {{height: 50}}
          />
        </div>
      </div>
    );
  };
}
export default withRouter(ControlPanel);
