const Joi = require('joi');

const validateUser = ({ displayName, password, email }) =>
  Joi.object({
    displayName: Joi.string().min(8).required()
    .messages({
      'string.min': '"displayName" length must be at least 8 characters long',
      'string.required': '"username" is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
      'string.required': '"password" is required',
    }),
    email: Joi.string()
    .regex(/^(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i).required()
    .messages({
      'string.pattern.base': '"email" must be a valid email',
      'string.required': '"email" is required',
    }),
  }).validate({ displayName, password, email });

module.exports = {
  validateUser,
};