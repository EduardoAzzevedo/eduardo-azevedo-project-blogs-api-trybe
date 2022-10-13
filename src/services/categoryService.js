const { Category } = require('../models');

const inserCategory = async (name) => {
  console.log('Nome', name);
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll({});
  return allCategories;
};

module.exports = {
  inserCategory,
  getAllCategories,
};