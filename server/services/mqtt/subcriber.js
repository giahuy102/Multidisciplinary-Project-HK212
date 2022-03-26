const settings = require('./config');
const connection = require('./connection');


const subcribe = (callback = (err) => {}) => {
    try {
        const client = connection.connect();
        client.on('connect', () => {
            for (topic of settings.clientTopics) {
                client.subscribe(topic);
                console.log('Subcribe topic ' + topic);
            }
        });
        client.on('message', function(feedID, data) {
            console.log(`Data received from ${feedID}: ${data}`);
        });
        return client;
    } catch (err) {
        callback(err);
    }
    callback(undefined);
}

module.exports.subcribe = subcribe;