const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dbConnection = require('./services/database/connection')

dotenv.config();//load config from .env to process.env

// mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => 
//     console.log("Connect DB successfully")
// );

dbConnection.connect();

app.use(express.json());

const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);


// const verifyToken = require('./middleware/verifyToken');
// app.get('/', verifyToken, (req, res) => {
//     res.send('success');
// });


const subcriber = require('./services/mqtt/subcriber');
subcriber.subcribe();


app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`));