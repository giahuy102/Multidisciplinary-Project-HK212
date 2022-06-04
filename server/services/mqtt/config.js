//Use your own Adafruit server account to dev

let clientTopics = {
    temperature: "dat_huynh/feeds/bbc-temp",
    led: "dat_huynh/feeds/bbc-led",
    pump: "dat_huynh/feeds/bbc-pump",
    humiAir: "dat_huynh/feeds/bbc-humi-air",
    humiSoil: "dat_huynh/feeds/bbc-humi-soil",
    light: "dat_huynh/feeds/bbc-light",
};

let settings = {
    username: "dat_huynh",
    key: "aio_OXtD13SoCstFQ0BWCSM17wriOj8J",
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