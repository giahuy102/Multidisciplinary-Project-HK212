const express = require('express');
const { registerValidation, loginValidation } = require('../services/validation');
const router = express.Router();


router.post('/register', (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    return res.send(req.body);
});

module.exports = router;