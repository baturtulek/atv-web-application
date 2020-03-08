const db = require('../config/db');
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
  const { username } = res.locals.session.user;
  const user = req.body;
  try {
    await db.User.update(
      {
        name: user.name,
        surname: user.surname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
      },
      {
        where: { username },
        raw: true,
      },
    );
    const updatedUser = await getUserData(username);
    req.session.user = updatedUser;
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATED}`,
      type: 'success',
    };
    return res.redirect('/profile');
  } catch (error) {
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATE_ERROR}`,
      type: 'danger',
    };
    return res.redirect('/profile');
  }
};

exports.updateProfilePassword = async (req, res) => {
  const { username, password } = res.locals.session.user;
  const user = req.body;
  try {
    const result = await authentication.comparePasswords(user.currentPassword, password);
    if (!result) {
      req.session.flashMessages = {
        message: `${RESPONSE_MESSAGE.OLD_PASSWORD_INVALID}`,
        type: 'danger',
      };
      return res.redirect('/profile');
    }
    if (user.newpassword1 !== user.newpassword2) {
      req.session.flashMessages = {
        message: `${RESPONSE_MESSAGE.NEW_PASSWORDS_NOT_MATCHES}`,
        type: 'danger',
      };
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
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATED}`,
      type: 'success',
    };
    return res.redirect('/profile');
  } catch (error) {
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATE_ERROR}`,
      type: 'danger',
    };
    return res.redirect('/profile');
  }
};

const getUserData = async (username) => {
  const user = await db.User.findOne({
    where: { username },
    raw: true,
  });
  return user;
};
