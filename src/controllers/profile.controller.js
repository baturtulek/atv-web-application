const { db } = require('../models/DB');
const authentication = require('../utils/authentication');
const { RESPONSE_MESSAGE } = require('../messages');

const ROUTE_NAME = 'Profil';

exports.profileView = async (req, res) => {
  const { user } = res.locals.session;
  const userRole = await db.UserRole.findOne({
    where: {
      id: user.roleId,
    },
    raw: true,
  });
  user.role = userRole.role;
  return res.render('layouts/main', {
    partialName: 'profile',
    user,
  });
};

exports.updateProfileInfo = async (req, res) => {
  const { id } = res.locals.session.user;
  const user = req.body;
  try {
    await db.User.update(
      {
        name: user.name,
        surname: user.surname,
        email: user.email,
        phoneNumber: getNullableInput(user.phoneNumber),
        address: getNullableInput(user.address),
      },
      {
        where: { id },
        raw: true,
      },
    );
    const updatedUser = await getUserData(id);
    req.session.user = updatedUser;
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATED}`, type: 'success' };
    return res.redirect('/profile');
  } catch (error) {
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATE_ERROR}`, type: 'danger' };
    return res.redirect('/profile');
  }
};

exports.updateProfilePassword = async (req, res) => {
  const { username, password } = res.locals.session.user;
  const user = req.body;
  try {
    const result = await authentication.comparePasswords(user.currentPassword, password);
    if (!result) {
      req.session.flashMessages = { message: `${RESPONSE_MESSAGE.OLD_PASSWORD_INVALID}`, type: 'danger' };
      return res.redirect('/profile');
    }
    if (user.newpassword1 !== user.newpassword2) {
      req.session.flashMessages = { message: `${RESPONSE_MESSAGE.NEW_PASSWORDS_NOT_MATCHES}`, type: 'danger' };
      return res.redirect('/profile');
    }
    const hashedPassword = await authentication.hashPassword(user.newpassword1);
    await db.User.update(
      {
        password: hashedPassword,
      },
      {
        where: { username },
        raw: true,
      },
    );
    const updatedUser = await getUserData(username);
    req.session.user = updatedUser;
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATED}`, type: 'success' };
    return res.redirect('/profile');
  } catch (error) {
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATE_ERROR}`, type: 'danger' };
    return res.redirect('/profile');
  }
};

const getUserData = async (id) => {
  const user = await db.User.findOne({
    where: { id },
    raw: true,
  });
  return user;
};

const getNullableInput = (input) => {
  if (input === '' || input === undefined) {
    return null;
  }
  return input;
};
