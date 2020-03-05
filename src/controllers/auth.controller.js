const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.loginView = (req, res) => {
  if (res.locals.session.user) {
    return res.redirect('/');
  }
  return res.render('layouts/auth', { layout: 'auth', isCredentialsInvalid: false });
};

exports.login = async (req, res) => {
  const credentials = req.body;
  const ipAddress = getClientIpAddress(req);
  try {
    const dbUser = await db.User.findOne({
      where: { username: credentials.username },
      raw: true,
    });
    if (dbUser) {
      console.log(dbUser);
      if (dbUser.isActive) {
        const result = await bcrypt.compare(credentials.password, dbUser.password);
        if (result) {
          updateUserLastLogin(dbUser.id, ipAddress);
          req.session.user = dbUser;
          return res.redirect('/');
        }
      }
      return res.render('layouts/auth', {
        layout: 'auth',
        isCredentialsInvalid: true,
        message: 'Sistemi kullanmaya yetkiniz yok.',
      });
    }
    return res.render('layouts/auth', {
      layout: 'auth',
      isCredentialsInvalid: true,
      message: 'Kullanıcı adı veya şifre hatalı!',
    });
  } catch (error) {
    console.log(error);
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
