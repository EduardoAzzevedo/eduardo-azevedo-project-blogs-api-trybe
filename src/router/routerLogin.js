const express = require('express');
const { validateLogin } = require('../middleware/validateField');
const controllerLogin = require('../controllers/loginController');

const router = express.Router();

router.post('/', validateLogin, controllerLogin.getEmailPassword);

module.exports = router;