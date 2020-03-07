const db = require('../config/db');
const authentication = require('../utils/authentication');
const { getMessage, messageEnum } = require('../messages/messageCodes');

const ROUTE_NAME = 'Profil';

exports.profileView = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
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
    success: successMessage,
    error: errorMessage,
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
    return res.redirect(`/profile?${messageEnum.success.update}`);
  } catch (error) {
    return res.redirect(`/profile?${messageEnum.error.update}`);
  }
};

exports.updateProfilePassword = async (req, res) => {
  const { username, password } = res.locals.session.user;
  const user = req.body;
  try {
    const result = await authentication.comparePasswords(user.currentPassword, password);
    if (!result) {
      return res.redirect(`/profile?${messageEnum.error.old_password_invalid}`);
    }
    if (user.newpassword1 !== user.newpassword2) {
      return res.redirect(`/profile?${messageEnum.error.new_passwords_not_matches}`);
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
    return res.redirect(`/profile?${messageEnum.success.update}`);
  } catch (error) {
    return res.redirect(`/profile?${messageEnum.error.update}`);
  }
};

const getUserData = async (username) => {
  const user = await db.User.findOne({
    where: { username },
    raw: true,
  });
  return user;
};
