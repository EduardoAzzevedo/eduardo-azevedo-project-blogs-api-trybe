require('dotenv/config');
const jwt = require('jsonwebtoken');
const { getByEmailPassword } = require('../services/loginService');

const secret = process.env.JWT_SECRET || 'quiViagi';
const jwtConfig = { expiresIn: '5d', algorithm: 'HS256' };

const tokenGenerate = ({ displayName, email, password }) => {
  const payload = {
    displayName,
    email,
    password,
  };

  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

const isBoryValid = (email, password) => email && password;

 const createToken = async (req, res, next) => {
  try { 
    const { email, password } = req.body;
    if (!isBoryValid(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await getByEmailPassword(email, password);
    const token = jwt.sign({ data: { userEmail: user.email } }, secret, jwtConfig);
    req.token = token;
    next();
  } catch (e) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
};

module.exports = {
  tokenGenerate,
  createToken,
};