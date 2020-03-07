const db = require('../config/db');
const { comparePasswords } = require('../utils/authentication');

const INVALID_USER_CREDENTIALS = 'Kullanıcı adı veya şifre hatalı!';
const INSUFICIENT_USER_PRIVILEGES = 'Sistemi kullanmaya yetkiniz yok.';

exports.loginView = (req, res) => {
  if (res.locals.session.user) {
    return res.redirect('/');
  }
  return res.render('layouts/auth', { layout: 'auth', isCredentialsInvalid: false });
};

exports.login = async (req, res) => {
  const credentials = req.body;
  const clientIpAddress = getClientIpAddress(req);
  try {
    const dbUser = await getUserFromDb(credentials.username);
    if (dbUser) {
      const isPasswordValid = await comparePasswords(credentials.password, dbUser.password);
      if (isPasswordValid) {
        if (dbUser.isActive) {
          const userCompetencyList = await getUserCompetencies(dbUser.roleId);
          if (userCompetencyList.length !== 0) {
            req.session.user = dbUser;
            req.session.user.competencyList = userCompetencyList;
            updateUserLastLogin(dbUser.id, clientIpAddress);
            return res.redirect('/');
          }
        }
        return res.render('layouts/auth', {
          layout: 'auth',
          isCredentialsInvalid: true,
          message: INSUFICIENT_USER_PRIVILEGES,
        });
      }
    }
    return res.render('layouts/auth', {
      layout: 'auth',
      isCredentialsInvalid: true,
      message: INVALID_USER_CREDENTIALS,
    });
  } catch (error) {
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
