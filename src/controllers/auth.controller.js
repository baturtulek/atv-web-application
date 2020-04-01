const i18n = require('../services/i18n');
const { db } = require('../models/DB');
const { comparePasswords } = require('../utils/authentication');
const { getRoleCompetencies } = require('../controllers/competency.controller');
const { getFormattedTimeStamp } = require('../utils/timezoneHelpers');

exports.loginView = (req, res) => {
  if (res.locals.session.user) {
    return res.redirect('/');
  }
  return res.render('layouts/auth', {
    layout: 'auth',
  });
};

exports.login = async (req, res) => {
  const credentials = req.body;
  const clientIpAddress = getClientIpAddress(req);
  try {
    const dbUser = await getUserFromDb(credentials.username);
    if (dbUser) {
      const isPasswordValid = await comparePasswords(credentials.password, dbUser.password);
      if (isPasswordValid) {
        const userCompetencyList = await getRoleCompetencies(dbUser.roleId);
        if (!dbUser.isActive || userCompetencyList.length === 0) {
          req.session.flashMessages = {
            message: i18n.__('INSUFFICIENT_USER_PRIVILEGES'),
            type: 'danger',
          };
          return res.redirect('/login');
        }
        req.session.user = dbUser;
        req.session.userCompetencyList = userCompetencyList;
        updateUserLastLogin(dbUser.id, clientIpAddress);
        return res.redirect('/');
      }
    }
    req.session.flashMessages = {
      message: i18n.__('INVALID_CREDENTIALS'),
      type: 'danger',
    };
    return res.redirect('/login');
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('INTERNAL_ERROR'),
      type: 'danger',
    };
    return res.redirect('/login');
  }
};

exports.logout = (req, res) => {
  delete req.session.user;
  return res.redirect('/login');
};

const getClientIpAddress = (request) => {
  let clientIp = (request.headers['x-forwarded-for'] || '').split(',').pop()
    || request.connection.remoteAddress
    || request.socket.remoteAddress
    || request.connection.socket.remoteAddress;

  if (clientIp.substr(0, 7) === '::ffff:') {
    clientIp = clientIp.substr(7);
  }
  return clientIp;
};

const getUserFromDb = async (username) => {
  const user = await db.User.findOne({
    where: { username },
    raw: true,
  });
  return user;
};

const updateUserLastLogin = (userId, ip) => {
  db.UserLastLogin.upsert({
    userId,
    ip,
    lastLogin: getFormattedTimeStamp('YYYY-MM-DD HH:mm:ss'),
  });
};
