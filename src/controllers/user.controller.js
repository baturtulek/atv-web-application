const db = require('../config/db');
const authentication = require('../utils/authentication');
const { getMessage, messageEnum } = require('../messages/messageCodes');

const ROUTE_NAME = 'Kullanıcı';

exports.listUserView = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
  const userList = await db.User.findAll({
    raw: true,
    include: [
      {
        model: db.UserRole,
        attributes: ['role'],
      },
    ],
  });
  return res.render('layouts/main', {
    partialName: 'listUsers',
    userList,
    success: successMessage,
    error: errorMessage,
  });
};

exports.addUserView = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
  const userRole = await db.UserRole.findAll({
    raw: true,
  });
  return res.render('layouts/main', {
    partialName: 'addUser',
    endPoint: 'add',
    userRole,
    error: errorMessage,
    success: successMessage,
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
    return res.redirect(`/user/add?${messageEnum.error.inuse}`);
  }
  try {
    const hashedPassword = await authentication.hashPassword(user.password);
    await db.User.create({
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      password: hashedPassword,
      isActive: user.isActive == undefined ? 0 : 1,
    });
    return res.redirect(`/user/add?${messageEnum.success.add}`);
  } catch (error) {
    return res.redirect(`/user/add?error=${messageEnum.error.add}`);
  }
};

exports.updateUserView = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
  const { id } = req.params;
  const userRole = await db.UserRole.findAll({
    raw: true,
  });
  try {
    const user = await db.User.findOne({
      where: { id },
      raw: true,
    });
    if (!user) {
      return res.redirect('/user/list');
    }
    return res.render('layouts/main', {
      partialName: 'addUser',
      endPoint: 'update',
      userRole,
      user,
      error: errorMessage,
      success: successMessage,
    });
  } catch (error) {
    return res.redirect('/user/list');
  }
};

exports.updateUser = async (req, res) => {
  const user = req.body;
  try {
    await db.User.update(
      {
        name: user.name,
        surname: user.surname,
        email: user.email,
        roleId: user.roleId,
        phoneNumber: user.phoneNumber == '' ? null : user.phoneNumber,
        address: user.address,
        isActive: user.isActive == undefined ? 0 : 1,
      },
      {
        where: {
          id: user.id,
        },
        raw: true,
      },
    );
    return res.redirect(`/user/update/${user.id}?${messageEnum.success.update}`);
  } catch (error) {
    console.log(error);
    return res.redirect(`/user/update/${user.id}?${messageEnum.error.update}`);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findOne({
      where: { id },
    });
    if (!user) {
      return res.redirect('/user/list');
    }
    await db.User.destroy({
      where: { id },
    });
    return res.redirect(`/user/list?${messageEnum.success.delete}`);
  } catch (error) {
    return res.redirect(`/user/list?${messageEnum.error.delete}`);
  }
};
