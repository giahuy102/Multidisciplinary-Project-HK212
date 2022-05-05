import React, { Component } from "react";
import "./style.css";
import LED from "./schedule-components/LED";
import PUMP from "./schedule-components/PUMP";
import { Modal, Button } from "antd";
import "antd/dist/antd.css";
import Form from "./schedule-components/form";

import LEDDatabase from "./mock-data/LED-Data";
import PUMPDatabase from "./mock-data/PUMP-data";

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      led_data: LEDDatabase,
      pump_data: PUMPDatabase,

      count_LED: 0,
      connt_PUMP: 0,

      visible: false,
      loading: false,

      isEdit: false,
      title: "",
      typ: 0,                                 // 0: LED - 1: PUMP

      dayNow: "",

      defaultStart: "",
      defaultLong: 1,
      defaultDate: "",
      defaultDay: 0,
      defaultNote: "",

      id: "",
      start: "",
      long: 1,
      date: "",
      day: 0b0000000,
      note: "",

    }
  }
  showModal = (typ, mode, device) => {        // typ:   LED - PUMP
    let d = new Date();                       // mode:  create - edit
    let HH = d.getHours() >= 10 ? String(d.getHours()) : "0" + String(d.getHours()),
      MM = d.getMinutes() >= 10 ? String(d.getMinutes()) : "0" + String(d.getMinutes()),
      dd = d.getDate() >= 10 ? String(d.getDate()) : "0" + String(d.getDate()),
      mm = d.getMonth() >= 10 ? String(d.getMonth()) : "0" + String(d.getMonth()),
      yyyy = String(d.getFullYear());
    let _time = HH + ":" + MM,
      _day = yyyy + "-" + mm + "-" + dd;
    this.setState({
      visible: true,

      typ: typ,
      dayNow: _day,

    });
    if (mode === 1) {                           // mode: edit
      this.setState({
        isEdit: true,
        id: device.id,
        
        defaultStart: device.start,
        defaultDate: device.date,
        defaultDay: device.day,
        defaultLong: device.long,
        defaultNote: device.note,

        start: device.start,
        date: device.date,
        day: device.day,
        long: device.long,
        note: device.note,
      });
      if (typ === 0) {
        this.setState({
          title: "EDIT LED SCHEDULE",
        });
      }
      else {
        this.setState({
          title: "EDIT PUMP SCHEDULE",
        });
      }
    }
    else {                                // mode: create
      this.setState({
        isEdit: false,
        defaultStart: _time,
        defaultDate: _day,
        defaultDay: 0,
        defaultLong: 1,
        defaultNote: "",
        
        start: _time,
        date: _day,
        day: 0,
        long: 1,
        note: "",
      });
      if (typ === 0) {
        this.setState({
          title: "CREATE NEW LED SCHEDULE",
        });
      }
      else {
        this.setState({
          title: "CREATE NEW PUMP SCHEDULE",
        });
      }
    }
  };
  handleOk = () => {
    let { isEdit } = this.state;
    if (isEdit)
      this.handleEditOK();
    else
      this.handleCreateOK();
  };
  handleCreateOK = () => { 
    // handle checkbox
    var checkbox = document.getElementsByName('day');
    var result = 0;                                             

    for (var i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked === true) {
        result += Number(checkbox[i].value);
      }
    }

    let { led_data, pump_data, typ, count_LED, count_PUMP, start, long, date, note } = this.state;
    let id;
    if (typ === 0) {
      id = "LED" + String(count_LED);
      this.setState({ count_LED: count_LED + 1 });
    }
    else {
      id = "PUMP" + String(count_PUMP);
      this.setState({ count_PUMPL: count_PUMP + 1 });
    }
    let newSchedule = {
      id: id,
      day: result,
      date: date,
      start: start,
      long: long,
      note: note,
      status: 1
    };
    if (typ === 0) {
      led_data.push(newSchedule);
    }
    else {
      pump_data.push(newSchedule);
    }
    this.setState({
      led_data,
      pump_data,

      loading: true,

      start: "",
      long: 0,
      date: "",
      day: 0b0,
      note: "",
    });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);
  }
  handleEditOK = () => {
    // handle checkbox
    var checkbox = document.getElementsByName('day');
    var result = 0;                                             

    for (var i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked === true) {
        result += Number(checkbox[i].value);
      }
    }

    let { led_data, pump_data, typ, dayNow, id, start, long, date, note } = this.state;
    if (typ === 0) {
      if (led_data.length > 0) {
        for (let i = 0; i < led_data.length; i++) {
          if (id === led_data[i].id) {
            led_data[i].start = start;
            led_data[i].long = long;
            led_data[i].day = result;
            if (result)
              led_data[i].date = "";
            else if (date === "")
              led_data[i].date = dayNow;
            else
              led_data[i].date = date;
            led_data[i].note = note;
            break;
          }
        }
      }
    }
    else {
      if (pump_data.length > 0) {
        for (let i = 0; i < pump_data.length; i++) {
          if (id === pump_data[i].id) {
            pump_data[i].start = start;
            pump_data[i].long = long;
            pump_data[i].day = result;
            if (result)
              pump_data[i].date = "";
            else if (date === "")
              pump_data[i].date = dayNow;
            else
              pump_data[i].date = date;
            pump_data[i].note = note;
            break;
          }
        }
      }
    }
    this.setState({
      led_data,
      pump_data,

      loading: true,

      start: "",
      long: 0,
      date: "",
      day: 0b0,
      note: "",
    });
    setTimeout(() => {
      this.setState({ loading: false, visible: false, isEdit: false, });
    }, 2000);
  }
  handleDelete = () => {
    let { typ, id, led_data, pump_data } = this.state;
    if (typ === 0) {
      if (led_data.length > 0) {
        for (let i = 0; i < led_data.length; i++) {
          if (id === led_data[i].id) {
            led_data.splice(i, 1);
            break;
          }
        }
        this.setState({led_data});
      }
    }
    else {
      if (pump_data.length > 0) {
        for (let i = 0; i < pump_data.length; i++) {
          if (id === pump_data[i].id) {
            pump_data.splice(i, 1);
            break;
          }
        }
        this.setState({pump_data});
      }
    }
    this.setState({
      visible: false,
      isEdit: false,
    });
  }
  handleCancel = () => {
    this.setState({ 
      visible: false,

      defaultDate: "",
      defaultDay: 0,
      defaultLong: 1,
      defaultNote: "",
    });
  };
  handleChangeStart = (value) => {
    this.setState({ 
      start: value,
      defaultStart: value,
    });
  }
  handleChangeLong = (value) => {
    this.setState({ 
      long: value,
      defaultLong: value, 
    });
  }
  handleChangeDate = (value) => {
    this.setState({ 
      date: value,
      defaultDate: value,
    });
  }
  handleChangeNote = (value) => {
    this.setState({ 
      note: value,
      defaultNote: value,
    });
  }
  showForm = () => {
    let { typ, dayNow, defaultStart, defaultDate, defaultLong, defaultNote, defaultDay } = this.state;
    if (typ === 0) {
      return (
        <Form
          typ={"LED"}
          dayNow={dayNow}
          defaultStart={defaultStart}
          defaultDate={defaultDate}
          defaultDay={defaultDay}
          defaultLong={defaultLong}
          defaultNote={defaultNote}

          handleChangeDate={this.handleChangeDate}
          handleChangeLong={this.handleChangeLong}
          handleChangeStart={this.handleChangeStart}
          handleChangeNote={this.handleChangeNote}
        />
      );
    }
    return (
      <Form
        typ={"PUMP"}
        dayNow={dayNow}
        defaultStart={defaultStart}
        defaultDate={defaultDate}
        defaultDay={defaultDay}
        defaultLong={defaultLong}
        defaultNote={defaultNote}

        handleChangeDate={this.handleChangeDate}
        handleChangeLong={this.handleChangeLong}
        handleChangeStart={this.handleChangeStart}
        handleChangeNote={this.handleChangeNote}
      />
    );
  }
  renderLED = () => {
    let { led_data } = this.state;

    if (led_data.length === 0) {
      return (
        <LED led={0} />
      );
    }
    return led_data.map((led) => {
      return (
        <>
          <LED
            id={led.id}
            led={led}
            status={led.status}
            showModal={this.showModal}
          />
          <br />
        </>

      );
    });
  }
  renderPUMP = () => {
    let { pump_data } = this.state;

    if (pump_data.length === 0) {
      return (
        <PUMP pump={0} />
      );
    }
    return pump_data.map((pump) => {
      return (
        <>
          <PUMP
            id={pump.id}
            pump={pump}
            status={pump.status}
            showModal={this.showModal}
          />
          <br />
        </>

      );
    });
  }
  render = () => {
    const { visible, title, loading, isEdit } = this.state;

    return (
      <>
        <div className="background container-fluid p-0">
          <div
            style={{ backgroundColor: "rgba(0,0,0,0.1)", textAlign: "center" }}
            className="header"
          >
            <p style={{ fontSize: "40px", fontWeight: "bold" }}>Schedule</p>
          </div>

          <div className="row">
            <div className="col p-5">
              <div className="row justify-content-around">
                <div className="col-10">
                  <p style={{ fontSize: "20px", fontWeight: "bold" }}>LED Schedule</p>
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    style={{ borderRadius: "50%", border: "solid 2px" }}
                    onClick={() => this.showModal(0, 0, 0)}
                  >
                    <b
                      style={{ fontSize: "15px" }}
                    >
                      +
                    </b>
                  </button>
                </div>
              </div>
              
              <div>
                {this.renderLED()}
              </div>
            </div>

            <div className="col p-5">
              <div className="row justify-content-around">
                <div className="col-10">
                  <p style={{ fontSize: "20px", fontWeight: "bold" }}>PUMP Schedule</p>
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    style={{ borderRadius: "50%", border: "solid 2px" }}
                    onClick={() => this.showModal(1, 0, 0)}
                  >
                    <b
                      style={{ fontSize: "15px" }}
                    >
                      +
                    </b>
                  </button>
                </div>
              </div>

              <div>
                {this.renderPUMP()}
              </div>
            </div>
          </div>
        </div>
        <Modal
          visible={visible}
          title={title}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={() => this.handleCancel()}>
              Cancel
            </Button>,
            isEdit && <Button
              key=""
              type="danger"
              loading={loading}
              onClick={() => this.handleDelete()}
            >
              Delete
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => this.handleOk()}
            >
              Save
            </Button>,
          ]}
        >
          {this.showForm()}
        </Modal>
      </>
    );
  }
}

export default Schedule;