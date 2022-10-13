const express = require('express');
const categoryController = require('../controllers/categoryController');
const { validateCategory } = require('../middleware/validateCategoryField');
// const validateToken = require('../middleware/validateToken');

const routerCategory = express.Router();

routerCategory.post('/', validateCategory, categoryController.insertCategory);

routerCategory.get('/', categoryController.getAllCategories);

// routerUser.get('/:id', categoryController.getUserById);

module.exports = {
  routerCategory,
};