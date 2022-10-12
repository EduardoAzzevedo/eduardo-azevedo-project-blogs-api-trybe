const express = require('express');
const userController = require('../controllers/userController');
// const createToken = require('../middleware/createToken');
// const { validateUser } = require('../middleware/validateField');

const routerUser = express.Router();

routerUser.post('/', userController.insertUser);

module.exports = {
  routerUser,
};