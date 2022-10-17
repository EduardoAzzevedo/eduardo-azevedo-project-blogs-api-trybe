const messageError = 'Some required fields are missing';
const { Category } = require('../models');

const categoryValidate = async (req, res, next) => {
  const { categoryIds } = req.body;

  const categories = await Promise.all(categoryIds.map(async (id) => {
    const result = await Category.findOne({ where: { id } });
    return result;
  }));
  const categoryValidation = await categories.some((category) => !category);

  if (categoryValidation) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

const fieldValidate = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) return res.status(400).json({ message: messageError });
  next();
};

module.exports = {
  fieldValidate,
  categoryValidate,
};