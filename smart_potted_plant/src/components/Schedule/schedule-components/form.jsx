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
			defaultLong = this.props.defaultLong,
			defaultNote = this.props.defaultNote;

		return (
			<>
				<form style={{ alignContent: "center" }}>
					<input
						type="time" id="start"
						name="start" defaultValue={defaultStart}
						onChange={(event) => this.props.handleChangeStart(event.target.value)}
					/>
					<br /><br />

					<label for="long"><i>Time of {typ}:</i></label> &nbsp;
					<input
						type="number" id="long" name="long"
						min="1" defaultValue={defaultLong}
						onChange={(event) => this.props.handleChangeLong(event.target.value)}
					/>
					<i>&nbsp;(min)</i>
					<br /><br />

					<input
						type="date" id="date" name="date"
						min={dayNow} defaultValue={defaultDate}
						onChange={(event) => this.props.handleChangeDate(event.target.value)}
					/>
					<br /><br />

					<input type="checkbox" id="day1" name="day" value="1" />
					<label for="day1">  &nbsp;Mon</label> &nbsp;
					<input type="checkbox" id="day2" name="day" value="2" />
					<label for="day2"> &nbsp;Tue</label> &nbsp;
					<input type="checkbox" id="day3" name="day" value="4" />
					<label for="day3"> &nbsp;Wed</label> &nbsp;
					<input type="checkbox" id="day4" name="day" value="8" />
					<label for="day4"> &nbsp;Thu</label> &nbsp;
					<input type="checkbox" id="day5" name="day" value="16" />
					<label for="day5"> &nbsp;Fri</label> &nbsp;
					<input type="checkbox" id="day6" name="day" value="32" />
					<label for="day6"> &nbsp;Sat</label> &nbsp;
					<input type="checkbox" id="day7" name="day" value="64" />
					<label for="day7"> &nbsp;Sun</label><br /><br />

					<input
						type="text" id="note" name="note"
						placeholder="Note ..." maxLength={"40"}
						defaultValue={defaultNote}
						onChange={(event) => this.props.handleChangeNote(event.target.value)}
					/>
					<br /><br />
				</form>
			</>
		)
	}
}

export default Form;