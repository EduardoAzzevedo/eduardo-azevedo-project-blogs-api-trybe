const jwt = require('jsonwebtoken');

require('dotenv/config');
const { getByEmailPassord } = require('../services/loginService');

const secret = process.env.JWT_SECRET || 'quiViagi';

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await getByEmailPassord(decoded.data.userEmail);
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
};