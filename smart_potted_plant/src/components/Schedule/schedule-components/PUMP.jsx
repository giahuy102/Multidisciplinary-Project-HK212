import React, { Component } from "react";

class PUMP extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pump: this.props.pump,
			status: this.props.status,
		}
	}
	handleSwitch = (status) => {
		if (status === 1) {
			this.props.pump.status = 0;
			this.setState({
				status: 0,
			});
		}
		else {
			this.props.pump.status = 1;
			this.setState({
				status: 1,
			})
		}
	}
	switches = (status) => {
		if (status) {
			return (
				<div class="form-check form-switch">
					<input
						class="form-check-input"
						type="checkbox"
						id="flexSwitchCheckChecked"
						defaultChecked
						onClick={() => this.handleSwitch(status)}
					/>
				</div>
			);
		}
		return (
			<div class="form-check form-switch">
				<input
					class="form-check-input"
					type="checkbox"
					id="flexSwitchCheckDefault"
					onClick={() => this.handleSwitch(status)}
				/>
			</div>
		);
	}
	render = () => {
		let { pump, status } = this.state;
		if (!pump) {
			return (
				<div>
					Add new PUMP schedule...
				</div>
			);
		}
		let date = "";
		if (pump.day === 0b1111111) {
			date = "Everyday"
		}
		else if (pump.day) {
			let t = pump.day;
			for (var i = 0; i < 7 && t > 0; i++, t = t >> 1) {
				if (t % 2 === 1) {
					var d;
					switch (i) {
						case 0: d = "Mon"; break;
						case 1: d = "Tue"; break;
						case 2: d = "Wed"; break;
						case 3: d = "Thu"; break;
						case 4: d = "Fri"; break;
						case 5: d = "Sat"; break;
						case 6: d = "Sun"; break;
						default: d = ""; break;
					}
					if (date === "")
						date = d;
					else
						date += ", " + d;
				}
			}
		}
		else {
			const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
			const months = ["January ", "February ", "March ", "April ", "May ", "June ", "July ", "August ", "September ", "October ", "November ", "December "];
			const d = new Date(pump.date);
			const now = new Date();
			let year = d.getFullYear() === now.getFullYear() ? "" : ", " + String(d.getFullYear());
			date = days[d.getDay()] + ", " + months[d.getMonth()] + String(d.getDate()) + year;
		}
		let textColor = { color: "black" };
		if (!status) {
			textColor = { color: "grey" };
		}
		return (
			<div className="led-ele" style={textColor}>
				<p onClick={() => this.props.showModal(1, 1, pump)}>
					{pump.note}
				</p>
				<div className="row">
					<div 
						className="col-3" style={{ textAlign: "left", fontSize: "22px" }}
						onClick={() => this.props.showModal(1, 1, pump)}
					>
						<b>{pump.start}</b>
					</div>
					<div 
						className="col-3" style={{ textAlign: "center" }}
						onClick={() => this.props.showModal(1, 1, pump)}
					>
						<img
								style={{width: "30%", paddingTop: "5px"}}
								src={require("../images/drop.png")}
								alt=""
						/>
							
						<span>
						{pump.long} min
						</span>
						
					</div>
					<div 
						className="col-4" style={{ textAlign: "right" }}
						onClick={() => this.props.showModal(1, 1, pump)}
					>
						{date}
					</div>
					<div className="col-2">
						{this.switches(status)}
					</div>
				</div>
			</div>
		);
	}
}

export default PUMP;