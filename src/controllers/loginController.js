const login = require('../services/loginService');

const getEmailPassword = async (req, res) => {
  const { email, password } = req.body;
  const data = await login.getByEmailPassword(email, password);
  if (data) {
    return res.status(200).json(token);
  }
};

module.exports = {
  getEmailPassword,
};