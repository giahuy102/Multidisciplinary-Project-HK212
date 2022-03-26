class Publisher {
    constructor(client) {
        this.client = client;
    }
    publish = (feedID, data, callback = (err) => {}) => {
        try {
            if (feedID == undefined || data == undefined) {
                callback(Error("Cannot publish data!"));
                return;
            }
            data = String(data);
            this.client.publish(feedID, data);
        } catch (err) {
            callback(err);
            return;
        }
        callback(undefined);
    }
};
module.exports.Publisher = Publisher;