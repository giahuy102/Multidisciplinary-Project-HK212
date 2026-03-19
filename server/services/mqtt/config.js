const dotenv = require('dotenv');
dotenv.config();

const username = process.env.ADAFRUIT_IO_USERNAME;
const key = process.env.ADAFRUIT_IO_KEY;

if (!username || !key) {
    throw new Error(
        'Missing required environment variables: ADAFRUIT_IO_USERNAME and ADAFRUIT_IO_KEY. ' +
        'Copy server/.env.example to server/.env and fill in your Adafruit IO credentials.'
    );
}

let clientTopics = {
    temperature: `${username}/feeds/bbc-temp`,
    led: `${username}/feeds/bbc-led`,
    pump: `${username}/feeds/bbc-pump`,
    humiAir: `${username}/feeds/bbc-humi-air`,
    humiSoil: `${username}/feeds/bbc-humi-soil`,
    light: `${username}/feeds/bbc-light`,
};

let settings = {
    username: username,
    key: key,
    clientTopics: [
        clientTopics.temperature,
        clientTopics.led,
        clientTopics.pump,
        clientTopics.humiAir,
        clientTopics.humiSoil,
        clientTopics.light,
    ],
    feedKey: {
        temperature: "bbc-temp",
        led: "bbc-led",
        pump: "bbc-pump",
        humiAir: "bbc-humi-air",
        humiSoil: "bbc-humi-soild",
    },
    feedKeyDetail: clientTopics,
};

module.exports = settings