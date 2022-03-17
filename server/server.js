const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => 
    console.log("Connect DB successfully")
);

app.use(express.json());
const authRoute = require('./routes/auth');


app.use('/api/user', authRoute);


const verifyToken = require('./services/verifyToken');
app.get('/', verifyToken, (req, res) => {
    res.send('success');
});


const subcriber = require('./services/mqtt/subcriber');
subcriber.subcribe();


app.listen(3000, () => console.log('Server is running at http://localhost:3000'));