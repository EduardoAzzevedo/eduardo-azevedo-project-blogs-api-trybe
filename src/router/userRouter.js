const express = require('express');
const userController = require('../controllers/userController');
// const { tokenVerify } = require('../middleware/createToken');
// const { validateUser } = require('../middleware/validateField');

const routerUser = express.Router();

routerUser.post('/', userController.insertUser);

routerUser.get('/', userController.getUsers);

module.exports = {
  routerUser,
};