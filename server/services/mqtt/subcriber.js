const settings = require('./config');
const connection = require('./connection');
const axios = require("axios");
const subcribe = (callback = (err) => {}) => {
    try {
        const client = connection.connect();
        client.on('connect', () => {
            for (topic of settings.clientTopics) {
                client.subscribe(topic);
                console.log('Subcribe topic ' + topic);
            }
        });
        client.on('message', async function(feedID, data, package) {
            console.log(`Data received from ${feedID}: ${data}`);
            // emit to server
            let new_data = await axios.get(
                `https://io.adafruit.com/api/v2/${feedID}/data`, { params: { limit: 1 } }
            );
            global.io.emit("new_data", { feedID: feedID, data: new_data.data[0] });
        });
        return client;
    } catch (err) {
        callback(err);
    }
    callback(undefined);
}

module.exports.subcribe = subcribe;