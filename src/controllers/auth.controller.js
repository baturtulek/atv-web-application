const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const db = require('../config/db');

exports.loginView = (req, res) => {
  if (res.locals.session.user) {
    return res.redirect('/parkinglot/list');
  }
  res.render('layouts/auth', { layout: 'auth' });
};

exports.login = async (req, res) => {
  const credentials = req.body;
  console.log(credentials);
  try {
    const user = await db.User.findOne({
      where: { username: credentials.username },
      raw: true,
    });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'User not found this sould redirect to invalid credentials View',
      });
    }
    const result = await bcrypt.compare(credentials.password, user.password);
    if (result) {
      req.session.user = user;
      return res.redirect('/');
    }
    return res.status(httpStatus.UNAUTHORIZED).json({
      username: 'Auth Failed',
    });
  } catch (exception) {
    console.log(exception);
  }
};

exports.logout = (req, res) => {
  delete req.session.user;
  return res.status(httpStatus.OK).json({
    message: 'user logged out ', // redirect to appropiate view
  });
};
