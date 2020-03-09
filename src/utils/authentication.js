const bcrypt = require('bcrypt');
const { Routes } = require('../authorization/routes');

const hashRounds = 10;

exports.validateUserAndNavigate = (req, res, next) => {
  if (req.path === '/login') return next();
  if (!req.session.user) {
    return res.redirect('/login');
  }
  return next();
};

exports.validateUserRole = (req, res, next) => {
  if (req.path === '/' || req.path === '/login' || req.path === '/logout' || req.path === '/profile') {
    return next();
  }
  const path = req.path.slice(1).split('/')[0];
  const pathId = Routes[path];
  const { competencyList } = res.locals.session;
  for (const element of competencyList) {
    if (element.competencyNo == pathId) {
      return next();
    }
  }
  return res.redirect('/');
};

exports.comparePasswords = async (plainPassword, hashedPassword) => {
  const result = await bcrypt.compare(plainPassword, hashedPassword);
  return result;
};

exports.hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, hashRounds);
  return hashedPassword;
};
