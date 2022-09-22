//The 2 modules that allow us to set up the API routes
const express = require('express');
const router = express.Router();

//The controller that allows us to access the different API calls from the controller folder
const userCtrl = require('../controllers/user');

//Our routes for signup and login
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router;