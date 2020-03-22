const { db } = require('../models');
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
      roleId: user.roleId,
      password: hashedPassword,
      email: getNullableInput(user.email),
      phoneNumber: getNullableInput(user.phoneNumber),
      isActive: getCheckboxStatus(user.isActive),
    });
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.ADDED}`, type: 'success' };
    return res.redirect('/user/add');
  } catch (error) {
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.ADD_ERROR}`, type: 'danger' };
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
    const updatedUserObject = await createUserObject(user);
    await db.User.update(updatedUserObject,
      {
        where: {
          id: user.id,
        },
        raw: true,
      });
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATED}`, type: 'success' };
    return res.redirect(`/user/update/${user.id}`);
  } catch (error) {
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATE_ERROR}`, type: 'danger' };
    return res.redirect(`/user/update/${user.id}`);
  }
};

const createUserObject = async (user) => {
  const updatedUser = {
    name: user.name,
    surname: user.surname,
    roleId: user.roleId,
    email: getNullableInput(user.email),
    phoneNumber: getNullableInput(user.phoneNumber),
    address: getNullableInput(user.address),
    isActive: getCheckboxStatus(user.isActive),
  };
  if (getCheckboxStatus(user.isPasswordActive)) {
    updatedUser.password = await authentication.hashPassword(user.password);
  }
  return updatedUser;
};

const getNullableInput = (input) => {
  if (input === '' || input === undefined) {
    return null;
  }
  return input;
};

const getCheckboxStatus = (input) => {
  if (input == undefined) {
    return false;
  }
  return true;
};
