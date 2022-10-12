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

module.exports = {
  inserUser,
};