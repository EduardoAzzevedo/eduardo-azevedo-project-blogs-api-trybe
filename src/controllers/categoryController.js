const categoryService = require('../services/categoryService');
const createToken = require('../middleware/createToken');

const insertCategory = async (req, res) => {
  const { name } = req.body;
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    createToken.tokenVerify(authorization);
    const category = await categoryService.inserCategory(name);
    return res.status(201).json(category);
  } catch (e) {
    console.log('erre aturização', e);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    if (!categories) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(categories);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  insertCategory,
  getAllCategories,
};