//Use your own Adafruit server account to dev

let clientTopics = {
    temprature: "dat_huynh/feeds/bbc-temp",
    led: "dat_huynh/feeds/bbc-led",
    pump: "dat_huynh/feeds/bbc-pump",
    humiAir: "dat_huynh/feeds/bbc-humi-air",
    humiSoild: "dat_huynh/feeds/bbc-humi-soild",
};

let settings = {
    username: "dat_huynh",
    key: "aio_nmMP12cvDwjXGwRSJ8uXY1HPT5DQ",
    clientTopics: [
        clientTopics.temprature,
        clientTopics.led,
        clientTopics.pump,
        clientTopics.humiAir,
        clientTopics.humiSoild,
    ],
    feedKey: {
        temprature: "bbc-temp",
        led: "bbc-led",
        pump: "bbc-pump",
        humiAir: "bbc-humi-air",
        humiSoild: "bbc-humi-soild",
    },
    feedKeyDetail: clientTopics
};

module.exports = settings