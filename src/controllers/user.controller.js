const db = require('../config/db');
const authentication = require('../utils/authentication');

exports.listUserView = async (req, res) => {
  const userList = await db.User.findAll({
    raw: true,
    include: [
      {
        model: db.UserRole,
        attributes: ['role'],
      },
    ],
  });
  return res.render('layouts/main', { partialName: 'listUsers', userList });
};

exports.addUserView = async (req, res) => {
  const userRole = await db.UserRole.findAll({
    raw: true,
  });
  return res.render('layouts/main', {
    partialName: 'addUser',
    userRole,
    success: req.session.success,
    fail: req.session.fail,
    message: req.session.message,
  });
};

exports.addUser = async (req, res) => {
  const user = req.body;
  const dbUser = await db.User.findAll({
    where: {
      username: user.username,
    },
    raw: true,
  });
  if (dbUser.length !== 0) {
    req.session.fail = true;
    req.session.message = 'Kullanıcı adı sistemde zaten kayıtlı. Başka bir kullanıcı adı seçin.';
    return res.redirect('/user/add');
  }
  try {
    const hashedPassword = await authentication.hashPassword(user.password);
    const newUser = await db.User.create({
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      password: hashedPassword,
      isActive: user.isActive == undefined ? 0 : 1,
    });
    console.log(newUser);
    if (newUser) {
      return res.redirect('/user/list');
    }
  } catch (error) {
    console.log(error);
  }
  return res.redirect('/user/add');
};
