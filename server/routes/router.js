const express = require('express');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../services/auth/validation');
const User = require('../model/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { username } = require('../services/mqtt/config');
const axios = require("axios");

const settings = require("../services/mqtt/config");
const subcriber = require("../services/mqtt/subcriber");
const client = subcriber.subcribe((err) => console.log(err));
const Publisher = require("../services/mqtt/publisher").Publisher;
const publisher = new Publisher(client);
router.post('/register', async(req, res) => {
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

router.post('/login', async(req, res) => {
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
router.get("/get-all-data", async(req, res) => {
    // Check jwt
    let maxRecordGet = 10;
    let temperature = (
        await axios.get(
            `https://io.adafruit.com/api/v2/${settings.feedKeyDetail.temperature}/data`, { params: { limit: maxRecordGet } }
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
router.post("/change-device-status", async(req, res) => {
    let feedID = undefined;
    if (req.body.device == "led") feedID = settings.feedKeyDetail.led;
    else if (req.body.device == "pump") feedID = settings.feedKeyDetail.pump;
    publisher.publish(feedID, req.body.deviceStatus, (err) => {
        if (err) return res.status(201).send(err.toString());
        return res.status(200).send();
    });
});
module.exports = router;