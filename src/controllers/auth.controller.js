const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.loginView = (req, res) => {
  if (res.locals.session.user) {
    return res.redirect('/');
  }
  return res.render('layouts/auth', { layout: 'auth', isCredentialsInvalid: false });
};

exports.login = async (req, res) => {
  const ipAddress = req.connection.remoteAddress;
  const credentials = req.body;
  try {
    const dbUser = await db.User.findOne({
      where: { username: credentials.username },
      raw: true,
    });
    if (dbUser) {
      const result = await bcrypt.compare(credentials.password, dbUser.password);
      if (result) {
        insertIpAddress(credentials.username, ipAddress);
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

const insertIpAddress = (username, ipAddress) => {
  db.User.update(
    { ipAddress },
    { where: { username } },
  );
};
