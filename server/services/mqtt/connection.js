const mqtt = require('mqtt');
const settings = require('./config');

const dotenv = require('dotenv');
dotenv.config();

const connect = () => {
    return mqtt.connect({
        host: process.env.ADAFRUIT_SERVER,
        port: process.env.MQTT_PORT,
        username: settings.username,
        password: settings.key
    });
}

module.exports.connect = connect;

