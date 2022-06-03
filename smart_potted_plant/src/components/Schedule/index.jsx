import React, { Component } from "react";
import "./style.css";
import LED from "./schedule-components/LED";
import PUMP from "./schedule-components/PUMP";
import { Modal, Button } from "antd";
import "antd/dist/antd.css";
import Form from "./schedule-components/form";

import LEDDatabase from "./mock-data/LED-Data";
import PUMPDatabase from "./mock-data/PUMP-data";
// const mongoose = require('mongoose');
// const LEDDatabase = require("../../../../server/model/LEDSchedule");
// const PUMPDatabase = require("../../../../server/model/PUMPSchdule")

import axios from 'axios';
const API_URL = "http://localhost:3001/api/user/";

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      led_data: [],
      pump_data: [],

      showLEDSchedule: false,
      showPUMPSchedule: false,

      // led_data: LEDDatabase,
      // pump_data: PUMPDatabase,

      // count_LED: 0,
      // connt_PUMP: 0,

      visible: false,
      loading: false,
      deleteLoading: false,

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
  showSchedule = (typ, status) => {
    if (typ === 0) {
      this.setState({
        showLEDSchedule: !status,
      });
      if (!status) {
        this.pullData(0);
      }
    }
    else if (typ === 1) {
      this.setState({
        showPUMPSchedule: !status,
      });
      if (!status) {
        this.pullData(1);
      }
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
        id: device._id,

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
  handleCreateOK = async () => {
    // handle checkbox
    var checkbox = document.getElementsByName('day');
    var result = 0;

    for (var i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked === true) {
        result += Number(checkbox[i].value);
      }
    }

    let { led_data, pump_data, typ, start, long, date, note } = this.state;
    // let id;
    // if (typ === 0) {
    //   id = "LED" + String(count_LED);
    //   this.setState({ count_LED: count_LED + 1 });
    // }
    // else {
    //   id = "PUMP" + String(count_PUMP);
    //   this.setState({ count_PUMPL: count_PUMP + 1 });
    // }
    let newSchedule = {
      // id: id,
      day: result,
      date: date,
      start: start,
      long: long,
      note: note,
      status: 1
    };
    if (typ === 0) {
      //led_data.push(newSchedule);
      await axios.post(API_URL + "create-led-schedule", newSchedule);
      this.pullData(0);
    }
    else {
      await axios.post(API_URL + "create-pump-schedule", newSchedule);
      this.pullData(1);
    }
    this.setState({
      // led_data,
      // pump_data,

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
  handleEditOK = async () => {
    // handle checkbox
    var checkbox = document.getElementsByName('day');
    var result = 0;

    for (var i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked === true) {
        result += Number(checkbox[i].value); console.log("Day of week: ", result);
      }
    }

    let { led_data, pump_data, typ, dayNow, id, start, long, date, note } = this.state;
    
    let _date;
    if (result)     
      _date = "";
    else if (date === "") 
      _date = dayNow;
    else  
      _date = date;

    const newSchedule = {
      id: id,
      start: start, 
      long: long,
      day: result,
      date: _date,
      note: note
    }
    if (typ === 0) {
      if (led_data.length > 0) {
        await axios.put(API_URL + "update-led-schedule", newSchedule);
        this.pullData(0);
        // for (let i = 0; i < led_data.length; i++) {
        //   if (id === led_data[i].id) {
        //     led_data[i].start = start;
        //     led_data[i].long = long;
        //     led_data[i].day = result;
        //     if (result)
        //       led_data[i].date = "";
        //     else if (date === "")
        //       led_data[i].date = dayNow;
        //     else
        //       led_data[i].date = date;
        //     led_data[i].note = note;
        //     break;
        //   }
        // }
      }
    }
    else {
      if (pump_data.length > 0) {
        await axios.put(API_URL + "update-pump-schedule", newSchedule);
        this.pullData(1);
        // for (let i = 0; i < pump_data.length; i++) {
        //   if (id === pump_data[i].id) {
        //     pump_data[i].start = start;
        //     pump_data[i].long = long;
        //     pump_data[i].day = result;
        //     if (result)
        //       pump_data[i].date = "";
        //     else if (date === "")
        //       pump_data[i].date = dayNow;
        //     else
        //       pump_data[i].date = date;
        //     pump_data[i].note = note;
        //     break;
        //   }
        // }
      }
    }
    this.setState({
      // led_data,
      // pump_data,

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
  handleDelete = async () => {
    let { typ, id, led_data, pump_data } = this.state;
    const delSchedule = {id: id}; console.log("delSchedule: ", delSchedule);
    if (typ === 0) {
      if (led_data.length > 0) {
        await axios.post(API_URL + "del-led-schedule", delSchedule);
        // for (let i = 0; i < led_data.length; i++) {
        //   if (id === led_data[i].id) {
        //     led_data.splice(i, 1);
        //     break;
        //   }
        // }
        await this.pullData(0);
        this.setState({
          // led_data,
          deleteLoading: true,
        });
      }
    }
    else {
      if (pump_data.length > 0) {
        await axios.post(API_URL + "del-pump-schedule", delSchedule);
        // for (let i = 0; i < pump_data.length; i++) {
        //   if (id === pump_data[i].id) {
        //     pump_data.splice(i, 1);
        //     break;
        //   }
        // }
        await this.pullData(1);
        this.setState({
          // pump_data,
          deleteLoading: true,
        });
      }
    }
    setTimeout(() => {
      this.setState({
        visible: false,
        isEdit: false,
        deleteLoading: false,
      });
    }, 2000);

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
            id={led._id}
            led={led}
            status={led.status}
            showModal={this.showModal}
            pullData={this.pullData}
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
            id={pump._id}
            pump={pump}
            status={pump.status}
            showModal={this.showModal}
            pullData={this.pullData}
          />
          <br />
        </>

      );
    });
  }
  pullData = async (typ) => {
    if (typ === 0) {
      let response = await axios({
        method: "get",
        data: {},
        url: API_URL + "get-all-led-schedule",
        withCredentials: true,
      }); console.log("Respone pull data: ", response.data);
      await this.setState({
        led_data: response.data,
      });
    }
    else if (typ === 1) {
      let response = await axios({
        method: "get",
        data: {},
        url: API_URL + "get-all-pump-schedule",
        withCredentials: true,
      }); console.log("Respone pull data: ", response.data);
      await this.setState({
        pump_data: response.data,
      });
    }
  }
  render = () => {
    const { led_data, pump_data, visible, title, loading, deleteLoading, isEdit, showLEDSchedule, showPUMPSchedule } = this.state;

    //let led_data = axios.get(API_URL + "get-all-led-schedule").Object.data; console.log("Get LED data --> ", led_data);
    //this.pullData();

    console.log("led-data: ", led_data);
    console.log("pump-data: ", pump_data);
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
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{ fontSize: "20px", fontWeight: "bold", border: "solid 2px" }}
                    onClick={() => this.showSchedule(0, showLEDSchedule)}
                  >
                    LED Schedule
                  </button>
                  {/* <p style={{ fontSize: "20px", fontWeight: "bold" }}>LED Schedule</p> */}
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
              <br></br>
              <div>
                {showLEDSchedule && this.renderLED()}
              </div>
            </div>

            <div className="col p-5">
              <div className="row justify-content-around">
                <div className="col-10">
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{ fontSize: "20px", fontWeight: "bold", border: "solid 2px" }}
                    onClick={() => this.showSchedule(1, showPUMPSchedule)}
                  >
                    PUMP Schedule
                  </button>
                  {/* <p style={{ fontSize: "20px", fontWeight: "bold" }}>PUMP Schedule</p> */}
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
              <br/>
              <div>
                {showPUMPSchedule && this.renderPUMP()}
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
              loading={deleteLoading}
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