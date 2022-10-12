const Joi = require('joi');

const validateUser = ({ displayName, password, email }) =>
  Joi.object({
    displayName: Joi.string().min(8).required()
    .messages({
      'string.min': '"displayName" length must be at least 8 characters long',
      'string.required': '"username" is required',
    }),
    email: Joi.string()
    .regex(/(.+)@(.+){2,}\.(.+){2,}/).required()
    .messages({
      'string.pattern.base': '"email" must be a valid email',
      'string.required': '"email" is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be at least 6 characters long',
      'string.required': '"password" is required',
    }),
  }).validate({ displayName, email, password });

module.exports = {
  validateUser,
};