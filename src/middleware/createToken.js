require('dotenv/config');
const jwt = require('jsonwebtoken');
const { getByEmailPassword } = require('../services/loginService');

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '7h', algorithm: 'HS256' };

const tokenGenerate = (id) => {
  const token = jwt.sign({ id }, secret, jwtConfig);

  return token;
};

const getUserIdFromToken = async ({ authorization: token }) => {
  const validatedToken = jwt.verify(token, secret);

  return validatedToken.id;
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
const tokenVerify = (authorization) => jwt.verify(authorization, secret);

module.exports = {
  tokenGenerate,
  createToken,
  tokenVerify,
  getUserIdFromToken,
};