const db = require('../config/db');
const { comparePasswords } = require('../utils/authentication');
const { RESPONSE_MESSAGE } = require('../messages');

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
        const userCompetencyList = await getUserCompetencies(dbUser.roleId);
        if (!dbUser.isActive || userCompetencyList.length === 0) {
          req.session.flashMessages = {
            message: RESPONSE_MESSAGE.INSUFFICIENT_USER_PRIVILEGES,
            type: 'danger',
          };
          return res.redirect('/login');
        }
        req.session.user = dbUser;
        req.session.competencyList = userCompetencyList;
        updateUserLastLogin(dbUser.id, clientIpAddress);
        return res.redirect('/');
      }
    }
    req.session.flashMessages = {
      message: RESPONSE_MESSAGE.INVALID_CREDENTIALS,
      type: 'danger'
    };
    return res.redirect('/login');
  } catch (error) {
    req.session.flashMessages = {
      message: RESPONSE_MESSAGE.INTERNAL_ERROR,
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
    lastLogin: getCurrentTimeStamp(),
  });
};

const getCurrentTimeStamp = () => {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  return `${date} ${time}`;
};

const getUserCompetencies = async (roleId) => {
  const userCompetencyList = await db.RoleCompetency.findAll({
    include: [
      {
        model: db.Competency,
        attributes: ['description'],
      },
    ],
    where: { roleId },
    raw: true,
  });
  return userCompetencyList;
};
