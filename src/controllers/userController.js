const userService = require('../services/userService');

const insertUser = async (req, res) => {
  const token = await userService.inserUser(req.body);
  if (token.status) {
    return res.status(token.status).json({ message: token.message });
  }
  return res.status(201).json({ token });
};

module.exports = {
  insertUser,
};