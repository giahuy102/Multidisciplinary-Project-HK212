import React, { Component } from "react";

class Form extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}
	render = () => {
		let typ = this.props.typ,
			dayNow = this.props.dayNow,
			defaultStart = this.props.defaultStart,
			defaultDate = this.props.defaultDate,
			defaultDay = this.props.defaultDay,
			defaultLong = this.props.defaultLong,
			defaultNote = this.props.defaultNote;
		
		var mon, tue, wed, thu, fri, sat, sun;
		let t = defaultDay;
		if (t % 2 === 1) 	mon = true;
		else				mon = false;
		t = t >> 1;
		if (t % 2 === 1) 	tue = true;
		else				tue = false;
		t = t >> 1;
		if (t % 2 === 1) 	wed = true;
		else				wed = false;
		t = t >> 1;
		if (t % 2 === 1) 	thu = true;
		else				thu = false;
		t = t >> 1;
		if (t % 2 === 1) 	fri = true;
		else				fri = false;
		t = t >> 1;
		if (t % 2 === 1) 	sat = true;
		else				sat = false;
		t = t >> 1;
		if (t % 2 === 1) 	sun = true;
		else				sun = false;
		
		return (
			<>
				<form style={{ alignContent: "center" }}>
					<input
						type="time" id="start"
						name="start" value={defaultStart}
						onChange={(event) => this.props.handleChangeStart(event.target.value)}
					/>
					<br /><br />

					<label htmlFor="long"><i>Time of {typ}:</i></label> &nbsp;
					<input
						type="number" id="long" name="long"
						min="1" value={defaultLong}
						onChange={(event) => this.props.handleChangeLong(event.target.value)}
					/>
					<i>&nbsp;(min)</i>
					<br /><br />

					<input
						type="date" id="date" name="date"
						min={dayNow} value={defaultDate}
						onChange={(event) => this.props.handleChangeDate(event.target.value)}
					/>
					<br /><br />

					{mon && <input type="checkbox" id="day1" name="day" value="0b0000001" defaultChecked/>}
					{!mon && <input type="checkbox" id="day1" name="day" value="0b0000001"/>}
					<label for="day1">  &nbsp;Mon</label> &nbsp;
					{tue && <input type="checkbox" id="day2" name="day" value="0b0000010" defaultChecked/>}
					{!tue && <input type="checkbox" id="day2" name="day" value="0b0000010"/>}
					<label for="day2"> &nbsp;Tue</label> &nbsp;
					{wed && <input type="checkbox" id="day3" name="day" value="0b0000100" defaultChecked/>}
					{!wed && <input type="checkbox" id="day3" name="day" value="0b0000100"/>}
					<label for="day3"> &nbsp;Wed</label> &nbsp;
					{thu && <input type="checkbox" id="day4" name="day" value="0b0001000" defaultChecked/>}
					{!thu && <input type="checkbox" id="day4" name="day" value="0b0001000"/>}
					<label for="day4"> &nbsp;Thu</label> &nbsp;
					{fri && <input type="checkbox" id="day5" name="day" value="0b0010000" defaultChecked/>}
					{!fri && <input type="checkbox" id="day5" name="day" value="0b0010000"/>}
					<label for="day5"> &nbsp;Fri</label> &nbsp;
					{sat && <input type="checkbox" id="day6" name="day" value="0b0100000" defaultChecked/>}
					{!sat && <input type="checkbox" id="day6" name="day" value="0b0100000"/>}
					<label for="day6"> &nbsp;Sat</label> &nbsp;
					{sun && <input type="checkbox" id="day7" name="day" value="0b1000000" defaultChecked/>}
					{!sun && <input type="checkbox" id="day7" name="day" value="0b1000000"/>}
					<label for="day7"> &nbsp;Sun</label><br /><br />

					<input
						type="text" id="note" name="note"
						placeholder="Note ..." maxLength={"40"}
						value={defaultNote}
						onChange={(event) => this.props.handleChangeNote(event.target.value)}
					/>
					<br /><br />
				</form>
			</>
		)
	}
}

export default Form;