const jwt = require('jsonwebtoken');

require('dotenv/config');
const userService = require('../services/userService');

const secret = process.env.JWT_SECRET;

const verifyAuthorization = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await userService.getById(decoded.body.userId);
    if (!user) {
      return res.status(401).json({ message: 'Token not found' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
  verifyAuthorization,
};