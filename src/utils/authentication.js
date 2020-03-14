const bcrypt = require('bcrypt');
const { mapRouteToCompetencyId } = require('../authorization/routes');

const hashRounds = 10;

exports.validateUserAndNavigate = (req, res, next) => {
  if (req.path === '/login') return next();
  if (!req.session.user) {
    return res.redirect('/login');
  }
  return next();
};

exports.validateUserRole = async (req, res, next) => {
  const path = parseUrlPath(req);
  if (isNonAuthorizedPath(path)) {
    return next();
  }
  const competencyId = await mapRouteToCompetencyId(path);
  const { competencyList } = res.locals.session;
  if (isUserAuthorized(competencyList, competencyId)) {
    return next();
  }
  return res.redirect('/');
};

const parseUrlPath = (req) => {
  return req.path.slice(1).split('/')[0];
};

const isNonAuthorizedPath = (path) => {
  if (path == ''
    || path == 'login'
    || path == 'logout'
    || path == 'profile') {
    return true;
  }
  return false;
};

const isUserAuthorized = (userCompetencyList, competencyId) => {
  for (const competency of userCompetencyList) {
    if (competency.competencyNo === competencyId) {
      return true;
    }
  }
  return false;
};

exports.comparePasswords = async (plainPassword, hashedPassword) => {
  const result = await bcrypt.compare(plainPassword, hashedPassword);
  return result;
};

exports.hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, hashRounds);
  return hashedPassword;
};
