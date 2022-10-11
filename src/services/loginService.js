const { User } = require('../models');

const getByEmailPassword = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  return user;
};

module.exports = {
  getByEmailPassword,
};