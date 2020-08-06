const express = require('express');
const router = express.Router();



// import from controllers
const {
    register,
    login
} = require('../api/controllers/auth');

router.post('/register', register);
router.post('/login', login);


module.exports = router;
