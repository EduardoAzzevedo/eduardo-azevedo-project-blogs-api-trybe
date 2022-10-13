const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).json({ message: 'Token not found' });
  } 
  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserService.getUserById(decoded.data.userId);
    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    req.email = decoded.email;
    req.id = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};