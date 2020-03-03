const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.loginView = (req, res) => {
  if (res.locals.session.user) {
    return res.redirect('/');
  }
  return res.render('layouts/auth', { layout: 'auth', isCredentialsInvalid: false });
};

exports.login = async (req, res) => {
  const ipAddress = getCallerIp(req);
  const credentials = req.body;
  try {
    const dbUser = await db.User.findOne({
      where: { username: credentials.username },
      raw: true,
    });
    if (dbUser) {
      const result = await bcrypt.compare(credentials.password, dbUser.password);
      if (result) {
        updateUserLastLogin(dbUser.id, ipAddress);
        req.session.user = dbUser;
        return res.redirect('/');
      }
    }
    return res.render('layouts/auth', { layout: 'auth', isCredentialsInvalid: true });
  } catch (error) {
    console.log(error);
  }
};

exports.logout = (req, res) => {
  delete req.session.user;
  return res.redirect('/login');
};

const getCallerIp = (req) => {
  let clientIp = req.connection.remoteAddress;
  if (clientIp.substr(0, 7) === '::ffff:') {
    clientIp = clientIp.substr(7);
  }
  return clientIp;
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
