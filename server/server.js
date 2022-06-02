const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dbConnection = require('./services/database/connection')
const bodyParser = require("body-parser")
dotenv.config(); //load config from .env to process.env

require('./services/schedule/schedule')

const cors = require('cors') //cross origin
app.use(
    cors({
        origin: process.env.CLIENT_ADDRESS, // <-- location of the react app were connecting to
        credentials: true,
    })
);

// mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => 
//     console.log("Connect DB successfully")
// );

dbConnection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiRouter = require('./routes/router');
app.use('/api/user', apiRouter);

// const verifyToken = require('./middleware/verifyToken');
// app.get('/', verifyToken, (req, res) => {
//     res.send('success');
// });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send("URL Not Found!");
});
app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`));