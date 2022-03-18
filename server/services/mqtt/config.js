//Use your own Adafruit server account to dev

let clientTopics = {
    lightSensor: 'legiahuy09122001/feeds/mp-light-sensor',
    soilMosture: 'legiahuy09122001/feeds/mp-soil-mosture'
}

let settings = {
    username: 'legiahuy09122001',
    key: 'aio_XIKE74TTQ8oMd6mACb1xrKw4KBdM',
    clientTopics: [clientTopics.lightSensor, clientTopics.soilMosture]
}

module.exports = settings
