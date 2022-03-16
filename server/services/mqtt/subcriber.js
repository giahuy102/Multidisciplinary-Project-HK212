const settings = require('./config');
const connection = require('./connection');


const subcribe = async () => {
    const client = await connection.connect();
    client.on('connect', () => {
        for (topic of settings.clientTopics) {
            client.subscribe(topic);
            console.log('Subcribe topic ' + topic);
        }
    });

    client.on('message', function(topic, message) {
        console.log(topic);
        console.log(message.toString());
    });
    return client;
}

module.exports.subcribe = subcribe;
