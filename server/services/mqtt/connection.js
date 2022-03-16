const mqtt = require('mqtt');
const settings = require('./config');

const connect = () => {
    return mqtt.connect({
        host: 'io.adafruit.com',
        port: 1883,
        username: settings.username,
        password: settings.key
    });
}

module.exports.connect = connect;

