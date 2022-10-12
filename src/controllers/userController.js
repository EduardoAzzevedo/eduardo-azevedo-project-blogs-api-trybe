const userService = require('../services/userService');

const insertUser = async (req, res) => {
  const newToken = await userService.inserUser(req.body);
  if (newToken.status) {
    return res.status(newToken.status).json({ message: newToken.message });
  }
  return res.status(201).json(newToken);
};

module.exports = {
  insertUser,
};