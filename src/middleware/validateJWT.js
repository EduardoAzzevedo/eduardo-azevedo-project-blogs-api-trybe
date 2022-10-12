const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'quiViagi';

const tokenValidate = async (token) => {
  if (!token) {
    const status = 401;
    const message = 'Token not found';
    const error = { status, message };
    throw error;
  }

  try {
    const tokenVerify = jwt.verify(token, secret);
    return tokenVerify;
  } catch (error) {
    const status = 401;
    const message = 'Expired or invalid token';
    const err = { status, message };
    throw err;
  }
};

module.exports = {
  tokenValidate,
};