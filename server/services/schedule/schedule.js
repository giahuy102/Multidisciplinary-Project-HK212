const schedule = require('node-schedule');

// const subcriber = require("../mqtt/subcriber");
// const client = subcriber.subcribe((err) => console.log(err));
// const Publisher = require("../mqtt/publisher").Publisher;
// const publisher = new Publisher(client);

/*
    * * * * * * *
    | | | | | | |_____________  year (optional)
    | | | | | |_______________  day of week
    | | | | |_________________  month
    | | | |___________________  day of month
    | | |_____________________  hour
    | |_______________________  minute
    |_________________________  second ( optional )
*/

/* 
    device {
        _id: ObjectId('STRING'),
        start:  'hh:mm',
        long:   number,
        day:    number,         ##  day of week: (0b_______) -> SUN - MON
        date:   'yyyy-mm-dd',   ##  evaluate after day
        note:   string,         ##  do not use in creating schedule
        status: number          ##  0 -> off | 1 -> on
    }
*/

const computeCronExpr = (start, long, day, date) => {
    let startHour = Number(start[0] + start[1]),
        startMinute = Number(start[3] + start[4]),
        startDay = "", 
        startMonth = "", 
        // startYear = "",
        dayofWeek = "";

    if (day === 0b1111111) {
        startDay = "*";
        startMonth = "*";
        // startYear = "*";
        dayofWeek = "0-6";
    }
    else if (day) {
        let t = day;
        for (var i = 0; i < 7 && t > 0; i++, t = t >> 1) {
            if (t % 2 === 1) {
                var d;
                switch (i) {
                    case 0: d = "1"; break;
                    case 1: d = "2"; break;
                    case 2: d = "3"; break;
                    case 3: d = "4"; break;
                    case 4: d = "5"; break;
                    case 5: d = "6"; break;
                    case 6: d = "0"; break;
                    default: d = ""; break;
                }
                if (dayofWeek === "")
                    dayofWeek = d;
                else
                    dayofWeek += "," + d;
            }
        }
        startDay = "*";
        startMonth = "*";
        // startYear = "*";
    }
    else {
        startDay = Number(date[8] + date[9]);
        startMonth = Number(date[5] + date[6]);
        // startYear = Number(date[0] + date[1] + date[2] + date[3]);
        dayofWeek = "*"
    }

    let endHour = startHour,
        endMinute = startMinute + long,
        endDay = startDay,
        endMonth = startMonth;

    if (endMinute > 59) {
        let plus = parseInt(endMinute) / 60;
        endMinute = parseInt(endMinute) % 60;
        endHour += plus;
    }
    if (endHour > 23) {
        let plus = parseInt(endHour) / 24;
        endHour = parseInt(endHour) % 24;
        if (day === 0) {
            endDay += plus;
        }
    }

    let cronExprON = "0 " + startMinute.toString() + " " + startHour.toString() + " " + startDay.toString() + " " + startMonth.toString() + " " + dayofWeek;
    let cronExprOFF = "0 " + endMinute.toString() + " " + endHour.toString() + " " + endDay.toString() + " " + endMonth.toString() + " " + dayofWeek;

    return { cronExprON, cronExprOFF };
}


const createSchedule = (typ, device, publisher) => {
    let cronExpr = computeCronExpr(device.start, device.long, device.day, device.date);
    console.log("Cron start -> ", cronExpr.cronExprON);
    console.log("Cron end -> ", cronExpr.cronExprOFF);
    const nameON = device._id.toString() + "ON";
    const nameOFF = device._id.toString() + "OFF";
    let feedID = undefined;
    if (typ === 0) {
        feedID = "dat_huynh/feeds/bbc-led";
    }
    else {
        feedID = "dat_huynh/feeds/bbc-pump";
    }
    schedule.scheduleJob(nameON, cronExpr.cronExprON, () => {
        /* 
            Change device status into ON
        */
        console.log("Run schedule...");
        publisher.publish(feedID, 1, (err) => {
            if (err) return console.log("Cannot run schedule!");
            return console.log("Run schedule successfully!");
        });
    });
    schedule.scheduleJob(nameOFF, cronExpr.cronExprOFF, () => {
        /* 
            Change device status into OFF
        */
        console.log("End schedule...");
        publisher.publish(feedID, 0, (err) => {
            if (err) return console.log("Cannot end schedule!");
            return console.log("End schedule successfully!");
        });
    });
}

const deleteSchedule = (typ, device) => {
    const nameON = device._id.toString() + "ON";
    const nameOFF = device._id.toString() + "OFF";
    schedule.cancelJob(nameON);
    schedule.cancelJob(nameOFF);
}

const Schedule = {
    createSchedule: createSchedule,
    deleteSchedule: deleteSchedule
}

module.exports = Schedule;