const express = require('express');
const userController = require('../controllers/userController');
// const { tokenVerify } = require('../middleware/createToken');

const routerUser = express.Router();

routerUser.post('/', userController.insertUser);

routerUser.get('/', userController.getUsers);

routerUser.get('/:id', userController.getUserById);

module.exports = {
  routerUser,
};