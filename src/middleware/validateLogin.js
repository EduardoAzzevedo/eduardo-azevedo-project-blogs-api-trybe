const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{6,}$/;

const validation = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  if (!email.test(regex) || !password.test(regex)) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  next();
};

module.exports = validation;
