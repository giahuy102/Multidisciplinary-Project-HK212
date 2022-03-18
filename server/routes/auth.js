const express = require('express');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../services/auth/validation');
const User = require('../model/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    //validate before saving to database
    const { error } = registerValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password 
    });

    user.password = await bcrypt.hash(user.password, salt);

    try {
        const savedUser = await user.save();
        const token = jwt.sign(
            { user_id: user._id,  },
            process.env.SECRET_TOKEN,
            {
                expiresIn: "2h",
            }
        );
        
        res.status(201).header('auth-token', token).send(token);
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    //validate before saving to database
    const { error } = loginValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send('User does not exist');

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (validPassword) {
        const token = jwt.sign(
            { user_id: user._id,  },
            process.env.SECRET_TOKEN,
            {
                expiresIn: "2h",
            }
        );
        res.status(200).header('auth-token', token).send('Logged in');
    } 
    else {
        res.status(400).send('Invalid password');
    }
});

module.exports = router;