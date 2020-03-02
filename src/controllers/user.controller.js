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
  const registrationType = await db.RegistrationType.findAll({
    raw: true,
  });
  return res.render('layouts/main', { partialName: 'addUser', userRole, registrationType });
};

exports.addUser = async (req, res) => {
  const {
    name, surname, username, tcNo, roleId, registrationTypeId, password, email,
  } = req.body;
  const isUsernameExists = await db.User.findAll({
    where: {
      username,
    },
    raw: true,
  });
  if (isUsernameExists.length === 0) {
    const hashedPassword = await authentication.hashPassword(password);
    try {
      const newUser = await db.User.create({
        name,
        surname,
        username,
        email,
        tcNo,
        roleId,
        registrationTypeId,
        password: hashedPassword,
      });
      if (newUser) {
        return res.redirect('/user/list');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return res.redirect('/user/add');
};
