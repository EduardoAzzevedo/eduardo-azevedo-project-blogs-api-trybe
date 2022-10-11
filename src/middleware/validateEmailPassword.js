require('dotenv/config');
const jwt = require('jsonwebtoken');
const { getByEmailPassword } = require('../services/loginService');

const secret = process.env.JWT_SECRET || 'quiViagi';
const jwtConfig = { expireIn: '7d', algorithm: 'HS256' };

const isBoryValid = (email, password) => email && password;

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!isBoryValid(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await getByEmailPassword(email, password);
    if (user.email !== email || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const token = jwt.sign({ data: { userEmail: user.email } }, secret, jwtConfig);
    req.token = token;
    next();
  } catch (e) {
    return res.status(500).json({ message: 'erro no token' });
  }
};