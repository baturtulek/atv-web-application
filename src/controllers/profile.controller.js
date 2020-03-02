const db = require('../config/db');
const authentication = require('../utils/authentication');

exports.profileView = async (req, res) => {
  const { user } = res.locals.session;
  const userRole = await db.UserRole.findAll({
    where: {
      id: user.roleId,
    },
    raw: true,
  });
  user.role = userRole[0].role;
  return res.render('layouts/main', { partialName: 'profile', user });
};

exports.updateProfileInfo = async (req, res) => {
  const { username } = res.locals.session.user;
  const user = req.body;
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
  const [updatedUser] = await getUserData(username);
  req.session.user = updatedUser;
  return res.redirect('/profile');
};

exports.updateProfilePassword = async (req, res) => {
  const { username, password } = res.locals.session.user;
  const user = req.body;
  if (user.newpassword1 !== user.newpassword2) {
    return res.redirect('/profile');
    // IF new passwords not match.
    // TODO: Create alert
  }
  const result = await authentication.comparePasswords(user.oldpassword, password);
  if (result) {
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
    const [updatedUser] = await getUserData(username);
    req.session.user = updatedUser;
  } else {
    return res.redirect('/profile');
    // TODO: Create alert. Old passwords not match
  }
  return res.redirect('/profile');
};

const getUserData = async (username) => {
  const user = await db.User.findAll({
    where: { username },
    raw: true,
  });
  return user;
};
