const jwt = require('./validateJWT');

const tokenMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  const userToken = await jwt.tokenValidate(token);

  if (!userToken) {
    const error = { status: 401, message: 'Expired or invalid token' };
    throw error;
  }

  req.locals = userToken;
  next();
};

module.exports = tokenMiddleware;