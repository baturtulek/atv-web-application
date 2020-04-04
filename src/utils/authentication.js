const bcrypt = require('bcryptjs');
const { getRouteCompetencyId } = require('../routes/ROUTE_COMPETENCY');

const hashRounds = 10;

exports.comparePasswords = async (plainPassword, hashedPassword) => {
  const result = await bcrypt.compare(plainPassword, hashedPassword);
  return result;
};

exports.hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, hashRounds);
  return hashedPassword;
};

exports.validateUserSession = (req, res, next) => {
  if (req.path === '/login') return next();
  if (!req.session.user) {
    return res.redirect('/login');
  }
  return next();
};

exports.validateUserRole = async (req, res, next) => {
  const { userCompetencyList } = res.locals.session;
  const route = parseUrl(req);
  if (isNonAuthorizedRoute(route)) {
    return next();
  }
  const routeCompetencyId = await getRouteCompetencyId(route);
  if (isUserAuthorized(userCompetencyList, routeCompetencyId)) {
    return next();
  }
  return res.redirect('/');
};

const parseUrl = (req) => {
  return req.path.slice(1).split('/')[0];
};

const isNonAuthorizedRoute = (path) => {
  if (path == ''
    || path == 'login'
    || path == 'logout'
    || path == 'profile') {
    return true;
  }
  return false;
};

const isUserAuthorized = (userCompetencyList, routeCompetencyId) => {
  for (const competency of userCompetencyList) {
    if (competency.competencyNo === routeCompetencyId) {
      return true;
    }
  }
  return false;
};
