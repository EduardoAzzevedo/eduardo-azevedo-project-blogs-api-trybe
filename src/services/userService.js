const { User } = require('../models');
const { validateUser } = require('../middleware/validateField');
const createToken = require('../middleware/createToken');

const inserUser = async (body) => {
  const JOIvalidate = validateUser(body);
  if (JOIvalidate.error) return { status: 400, message: JOIvalidate.error.details[0].message };

  const emailValidate = await User.findOne({ where: { email: body.email } });
  if (emailValidate) return { status: 409, message: 'User already registered' };
  const newUser = await User.create(body);
  const findUser = await User.findAll({
    attributes: ['displayName', 'email', 'password'],
    where: newUser.dataValues,
  });
  const newToken = createToken.tokenGenerate(findUser);
  return newToken;
};

const getUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const getUserById = async (id) => {
  const userById = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  if (!userById) {
    return { status: 404, message: 'User does not exist' };
  }
  return { status: 200, user: userById };
};

module.exports = {
  inserUser,
  getUsers,
  getUserById,
};