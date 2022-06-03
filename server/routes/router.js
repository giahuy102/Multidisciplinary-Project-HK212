const express = require('express');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../services/auth/validation');
const User = require('../model/User');
const router = express.Router();

const LEDDatabase = require('../model/LEDSchedule')
const PUMPDatabase = require('../model/PUMPSchdule')

const jwt = require('jsonwebtoken');
const { username } = require('../services/mqtt/config');
const axios = require("axios");

const settings = require("../services/mqtt/config");

const Schedule = require('../services/schedule/schedule');

const subcriber = require("../services/mqtt/subcriber");
const { mapReduce } = require('../model/User');
const client = subcriber.subcribe((err) => console.log(err));
const Publisher = require("../services/mqtt/publisher").Publisher;
const publisher = new Publisher(client);
// mongodb+srv://dbMinhNhan:<password>@cluster0.xcwra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
router.post('/register', async (req, res) => {
    //validate before saving to database
    const { error } = registerValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.password = await bcrypt.hash(user.password, salt);

    try {
        const savedUser = await user.save();
        // const token = jwt.sign(
        //     { user_id: user._id,  },
        //     process.env.SECRET_TOKEN,
        //     {
        //         expiresIn: "2h",
        //     }
        // );

        // res.status(201).header('auth-token', token).send(token);
        res.status(201).send("Register successfully");
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    //validate before saving to database
    console.log(req.headers)
    const { error } = loginValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send('User does not exist');

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (validPassword) {
        const token = jwt.sign({ user_id: user._id, },
            process.env.SECRET_TOKEN, {
            expiresIn: "2h",
        }
        );

        // user.accessToken = token;

        res.status(200).json({
            username: user.username,
            email: user.email,
            accessToken: token
        });
    } else {
        res.status(400).send('Invalid password');
    }
});
router.get("/get-all-data", async (req, res) => {
    // Check jwt
    let maxRecordGet = 10;
    let temperature = (
        await axios.get(
            `https://io.adafruit.com/api/v2/${settings.feedKeyDetail.temprature}/data`, { params: { limit: maxRecordGet } }
        )
    ).data;
    let ledStatus = (
        await axios.get(
            `https://io.adafruit.com/api/v2/${settings.feedKeyDetail.led}/data`, { params: { limit: maxRecordGet } }
        )
    ).data;
    let pumpStatus = (
        await axios.get(
            `https://io.adafruit.com/api/v2/${settings.feedKeyDetail.pump}/data`, { params: { limit: maxRecordGet } }
        )
    ).data;
    let humiSoil = (
        await axios.get(
            `https://io.adafruit.com/api/v2/${settings.feedKeyDetail.humiSoil}/data`, { params: { limit: maxRecordGet } }
        )
    ).data;
    let humiAir = (
        await axios.get(
            `https://io.adafruit.com/api/v2/${settings.feedKeyDetail.humiAir}/data`, { params: { limit: maxRecordGet } }
        )
    ).data;
    let light = (
        await axios.get(
            `https://io.adafruit.com/api/v2/${settings.feedKeyDetail.light}/data`, { params: { limit: maxRecordGet } }
        )
    ).data;
    res.status(200).json({
        temperature: temperature,
        humiAir: humiAir,
        humiSoil: humiSoil,
        light: light,
        ledStatus: ledStatus,
        pumpStatus: pumpStatus,
    });
});
router.post("/change-device-status", async (req, res) => {
    let feedID = undefined;
    if (req.body.device == "led") feedID = settings.feedKeyDetail.led;
    else if (req.body.device == "pump") feedID = settings.feedKeyDetail.pump;
    publisher.publish(feedID, req.body.deviceStatus, (err) => {
        if (err) return res.status(201).send(err.toString());
        return res.status(200).send();
    });
});
router.post("/create-led-schedule", async (req, res) => {
    let findOld = await LEDDatabase.findOne({
        start: req.body.start,
        long: req.body.long,
        day: req.body.day,
        date: req.body.date,
        note: req.body.note
    });
    if (findOld) {
        return res.status(401).send("LED Schedule already exists");
    }
    const led = new LEDDatabase({
        start: req.body.start,
        long: req.body.long,
        day: req.body.day,
        date: req.body.date,
        note: req.body.note,
        status: req.body.status
    });
    try {
        const createLED = await led.save();
        Schedule.createSchedule(0, createLED, publisher);                          // Create new schedule 
        res.status(201).send("Create new LED Schedule successfully");
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.get("/get-all-led-schedule", async (req, res) => {
    try {
        let LEDSchedules = await LEDDatabase.find({});
        res.status(200).send(LEDSchedules);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.put("/update-led-schedule", async (req, res) => {
    let findOld = await LEDDatabase.findOne({
        start: req.body.start,
        long: req.body.long,
        day: req.body.day,
        date: req.body.date,
        note: req.body.note
    });
    if (findOld) {
        return res.status(401).send("LED Schedule already exists");
    }

    const _id = req.body.id;
    const newStart = req.body.start;
    const newLong = req.body.long;
    const newDay = req.body.day;
    const newDate = req.body.date;
    const newNote = req.body.note;

    let foundLEDSchedule = await LEDDatabase.findById(_id); //.findOne({_id: ObjectId(_id)}); 
    
    foundLEDSchedule['start'] = newStart;
    foundLEDSchedule['long'] = newLong;
    foundLEDSchedule['day'] = newDay;
    foundLEDSchedule['date'] = newDate;
    foundLEDSchedule['note'] = newNote;

    try {
        await foundLEDSchedule.save();
        if (foundLEDSchedule.status === 1) {
            Schedule.deleteSchedule(0, foundLEDSchedule);
            Schedule.createSchedule(0, foundLEDSchedule, publisher);
        }
        res.status(200).send(foundLEDSchedule);
    }
    catch (err) {
        res.status(400).send("Cannot update LED Schedule");
    }
});
router.put("/update-led-status", async (req, res) => {
    const _id = req.body.id;
    const newStatus = req.body.status;

    let foundLEDSchedule = await LEDDatabase.findById(_id);
    foundLEDSchedule['status'] = newStatus;

    try {
        await foundLEDSchedule.save();
        if (newStatus) {
            Schedule.createSchedule(0, foundLEDSchedule, publisher);
        }
        else {
            Schedule.deleteSchedule(0, foundLEDSchedule);
        }
        res.status(200).send(foundLEDSchedule);
    }
    catch (err) {
        res.status(400).send("Cannot update LED status");
    }
});
router.post("/del-led-schedule", async (req, res) => {
    const _id = req.body.id; console.log("Delete Id: ", _id);
    try {
        let foundLEDSchedule = await LEDDatabase.findByIdAndDelete(_id); console.log("Delete LED: ", foundLEDSchedule);
        if (foundLEDSchedule.status === 1) {
            Schedule.deleteSchedule(0, foundLEDSchedule);
        }
        res.status(200).send("Delete LED Schedule successfully");
    }
    catch (err) {
        res.status(400).send("Cannot delete LED Schedule");
    }
});

router.post("/create-pump-schedule", async (req, res) => {
    let findOld = await PUMPDatabase.findOne({
        start: req.body.start,
        long: req.body.long,
        day: req.body.day,
        date: req.body.date,
        note: req.body.note
    });
    if (findOld) {
        return res.status(401).send("PUMP Schedule already exists");
    }
    const pump = new PUMPDatabase({
        start: req.body.start,
        long: req.body.long,
        day: req.body.day,
        date: req.body.date,
        note: req.body.note,
        status: req.body.status
    });
    try {
        const createPUMP = await pump.save();
        Schedule.createSchedule(1, createPUMP, publisher);                          // Create new schedule 
        res.status(201).send("Create new PUMP Schedule successfully");
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.get("/get-all-pump-schedule", async (req, res) => {
    try {
        let PUMPSchedules = await PUMPDatabase.find({});
        res.status(200).send(PUMPSchedules);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.put("/update-pump-schedule", async (req, res) => {
    let findOld = await PUMPDatabase.findOne({
        start: req.body.start,
        long: req.body.long,
        day: req.body.day,
        date: req.body.date,
        note: req.body.note
    });
    if (findOld) {
        return res.status(401).send("PUMP Schedule already exists");
    }
    const _id = req.body.id;
    const newStart = req.body.start;
    const newLong = req.body.long;
    const newDay = req.body.day;
    const newDate = req.body.date;
    const newNote = req.body.note;

    let foundPUMPSchedule = await PUMPDatabase.findById(_id); //.findOne({_id: ObjectId(_id)}); 

    foundPUMPSchedule['start'] = newStart;
    foundPUMPSchedule['long'] = newLong;
    foundPUMPSchedule['day'] = newDay;
    foundPUMPSchedule['date'] = newDate;
    foundPUMPSchedule['note'] = newNote;

    try {
        await foundPUMPSchedule.save();
        if (foundPUMPSchedule.status === 1) {
            Schedule.deleteSchedule(0, foundPUMPSchedule);
            Schedule.createSchedule(0, foundPUMPSchedule, publisher);
        }
        res.status(200).send(foundPUMPSchedule);
    }
    catch (err) {
        res.status(400).send("Cannot update PUMP Schedule");
    }
});
router.put("/update-pump-status", async (req, res) => {
    const _id = req.body.id;
    const newStatus = req.body.status;

    let foundPUMPSchedule = await PUMPDatabase.findById(_id);
    foundPUMPSchedule['status'] = newStatus;

    try {
        await foundPUMPSchedule.save();
        if (newStatus) {
            Schedule.createSchedule(0, foundPUMPSchedule, publisher);
        }
        else {
            Schedule.deleteSchedule(0, foundPUMPSchedule);
        }
        res.status(200).send(foundPUMPSchedule);
    }
    catch (err) {
        res.status(400).send("Cannot update PUMP status");
    }
});
router.post("/del-pump-schedule", async (req, res) => {
    const _id = req.body.id; console.log("Delete Id: ", _id);
    try {
        let foundPUMPSchedule = await PUMPDatabase.findByIdAndDelete(_id);
        if (foundPUMPSchedule.status === 1) {
            Schedule.deleteSchedule(0, foundPUMPSchedule);
        }res.status(200).send("Delete PUMP Schedule successfully");
    }
    catch (err) {
        res.status(400).send("Cannot delete PUMP Schedule");
    }
});
module.exports = router;