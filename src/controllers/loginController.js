// const jwt = require('jsonwebtoken');
const login = require('../services/loginService');
// require('dotenv/config');
// const { getByEmailPassword } = require('../services/loginService');

// const secret = process.env.JWT_SECRET || 'quiViagi';
// const jwtConfig = { expiresIn: '5d', algorithm: 'HS256' };

// const isBoryValid = (email, password) => email && password;

// module.exports = async (req, res) => {
//   try { 
//     const { email, password } = req.body;
//     if (!isBoryValid(email, password)) {
//       return res.status(400).json({ message: 'Some required fields are missing' });
//     }

//     const user = await getByEmailPassword(email, password);
//     if (!user || user.password !== password) {
//       return res.status(400).json({ message: 'Invalid fields' });
//     }
//     const token = jwt.sign({ data: { userEmail: user.email } }, secret, jwtConfig);
//     return res.status(200).json({ token });
//     // req.token = token;
//     // next();
//   } catch (e) {
//     return res.status(500).json({ message: 'Erro interno', error: e.message });
//   }
// };

const getEmailPassword = async (req, res) => {
  const { token } = req;
  const { email, password } = req.body;
  const data = await login.getByEmailPassword(email, password);
  if (data) {
    return res.status(200).json({ token });
  }
};

module.exports = {
  getEmailPassword,
};