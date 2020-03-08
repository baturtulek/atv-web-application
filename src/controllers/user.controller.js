const db = require('../config/db');
const authentication = require('../utils/authentication');
const { RESPONSE_MESSAGE } = require('../messages');

const ROUTE_NAME = 'Kullanıcı';

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
  return res.render('layouts/main', {
    partialName: 'listUsers',
    userList,
  });
};

exports.addUserView = async (req, res) => {
  const userRole = await db.UserRole.findAll({
    raw: true,
  });
  return res.render('layouts/main', {
    partialName: 'addUser',
    endPoint: 'add',
    userRole,
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
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.IN_USE}`,
      type: 'danger',
    };
    return res.redirect('/user/add');
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
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.ADDED}`,
      type: 'success',
    };
    return res.redirect('/user/add');
  } catch (error) {
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.ADD_ERROR}`,
      type: 'danger',
    };
    return res.redirect('/user/add');
  }
};

exports.updateUserView = async (req, res) => {
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
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATED}`,
      type: 'success',
    };
    return res.redirect(`/user/update/${user.id}`);
  } catch (error) {
    req.session.flashMessages = {
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATE_ERROR}`,
      type: 'danger',
    };
    return res.redirect(`/user/update/${user.id}`);
  }
};
