const express = require('express');
// const validateJWT = require('../middleware/validateJWT');
const { createToken } = require('../middleware/createToken');
const controllerLogin = require('../controllers/loginController');

const router = express.Router();

router.post('/', createToken, controllerLogin.getEmailPassword);

module.exports = router;