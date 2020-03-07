const bcrypt = require('bcrypt');

const hashRounds = 10;

exports.validateUserAndNavigate = (req, res, next) => {
  if (req.path == '/login') return next();
  if (!req.session.user) {
    return res.redirect('/login');
  }
  return next();
};

exports.comparePasswords = async (plainPassword, hashedPassword) => {
  const result = await bcrypt.compare(plainPassword, hashedPassword);
  return result;
};

exports.hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, hashRounds);
  return hashedPassword;
};
