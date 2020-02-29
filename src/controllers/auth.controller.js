const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.loginView = (req, res) => {
  if (res.locals.session.user) {
    return res.redirect('/parkinglot/list');
  }
  res.render('layouts/auth', { layout: 'auth', invalidCredentialsError: false });
};

exports.login = async (req, res) => {
  const credentials = req.body;
  try {
    const dbUser = await db.User.findOne({
      where: { username: credentials.username },
      raw: true,
    });
    if (dbUser) {
      const result = await bcrypt.compare(credentials.password, dbUser.password);
      if (result) {
        req.session.user = dbUser;
        return res.redirect('/');
      }
    }
    res.render('layouts/auth', { layout: 'auth', invalidCredentialsError: true });
  } catch (error) {
    console.log(error);
  }
};

exports.logout = (req, res) => {
  delete req.session.user;
  return res.redirect('/login');
};
