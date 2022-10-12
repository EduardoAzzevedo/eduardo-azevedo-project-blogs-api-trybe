const createToken = require('../middleware/createToken');
const userService = require('../services/userService');

const insertUser = async (req, res) => {
  const token = await userService.inserUser(req.body);
  if (token.status) {
    return res.status(token.status).json({ message: token.message });
  }
  return res.status(201).json({ token });
};

const getUsers = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    createToken.tokenVerify(authorization);
    const users = await userService.getUsers();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  insertUser,
  getUsers,
};