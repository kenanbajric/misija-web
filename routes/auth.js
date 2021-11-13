// core imports
const express = require('express');

// my imports - middleware
const isAuth = require('../middleware/is-auth.js');

// my imports - controllers
const authController = require('../controllers/auth');

const router = express.Router();

// routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.patch('/updatepassword', isAuth, authController.updatePw);

module.exports = router;