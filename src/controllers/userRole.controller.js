/* eslint-disable prefer-const */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-globals */
const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { DB } = require('../services/sequelize');

exports.listUserRoles = async (req, res) => {
  try {
    const userRoleList = await DB.UserRole.findAll({
      raw: true,
    });
    return res.render('layouts/main', {
      partialName: 'listUserRole',
      userRoleList,
    });
  } catch (exception) {
    console.log(exception);
  }
};

exports.addUserRoleView = async (req, res) => {
  try {
    const competencies = await DB.Competency.findAll({
      raw: true,
    });
    return res.render('layouts/main', {
      partialName: 'addUserRole',
      endPoint: 'add',
      competencies,
    });
  } catch (exception) {
    console.log(exception);
  }
};

exports.addUserRole = async (req, res) => {
  let { role, ...competencyIds } = req.body;
  competencyIds = Object.keys(competencyIds);
  competencyIds.forEach((element, index) => {
    competencyIds[index] = parseInt(element);
  });
  try {
    const found = await DB.UserRole.findOne({
      where: {
        role,
      },
    });

    if (!found && role !== '') {
      const createdRole = await DB.UserRole.create({
        role,
      });

      for (const id of competencyIds) {
        if (!isNaN(id)) {
          await DB.RoleCompetency.create({
            roleId: createdRole.id,
            competencyNo: id,
          });
        }
      }
      req.session.flashMessages = {
        message: i18n.__('ADDED', routeNames.USER_ROLE),
        type: 'success',
      };
      return res.redirect('/role/add');
    }
    req.session.flashMessages = {
      message: i18n.__('IN_USE', routeNames.USER_ROLE),
      type: 'danger',
    };
    return res.redirect('/role/add');
  } catch (error) {
    console.log(error);
    req.session.flashMessages = {
      message: i18n.__('ADD_ERROR', routeNames.USER_ROLE),
      type: 'danger',
    };
    return res.redirect('/role/add');
  }
};

exports.userRoleUpdateView = async (req, res) => {
  const { id } = req.params;
  const { Op } = DB.Sequelize;
  try {
    const role = await DB.UserRole.findOne({
      raw: true,
      where: {
        id,
      },
    });
    if (!role) return res.redirect('/role/list');
    const competencies = await DB.Competency.findAll({
      raw: true,
    });
    let userRoleCompetencies = await DB.RoleCompetency.findAll({
      raw: true,
      where: {
        roleId: id,
      },
    });
    userRoleCompetencies.forEach((element, index) => {
      userRoleCompetencies[index] = element.competencyNo;
    });
    userRoleCompetencies = await DB.Competency.findAll({
      raw: true,
      where: {
        id: {
          [Op.in]: userRoleCompetencies,
        },
      },
    });

    return res.render('layouts/main', {
      partialName: 'addUserRole',
      endPoint: 'update',
      competencies,
      userRoleCompetencies,
      role,
    });
  } catch (exception) {
    console.log(exception);
    return res.redirect('/role/list');
  }
};

exports.userRoleUpdate = async (req, res) => {
  let { role, id, ...competencyIds } = req.body;
  competencyIds = Object.keys(competencyIds);
  competencyIds.forEach((element, index) => {
    competencyIds[index] = parseInt(element);
  });
  try {
    const foundRole = await DB.UserRole.findOne({
      where: {
        id,
      },
    });
    req.session.flashMessages = {
      message: i18n.__('UPDATE_ERROR', routeNames.USER_ROLE),
      type: 'danger',
    };
    if (!foundRole) return res.redirect(`/role/update/${id}`);

    await DB.UserRole.update({
      role,
    },
    {
      where: {
        id,
      },
      raw: true,
    });
    await DB.RoleCompetency.destroy({
      where: {
        roleId: id,
      },
    });
    for (const competencyNo of competencyIds) {
      if (!isNaN(id)) {
        await DB.RoleCompetency.upsert({
          roleId: id,
          competencyNo,
        },
        {
          raw: true,
        });
      }
    }
    req.session.flashMessages = {
      message: i18n.__('UPDATED', routeNames.USER_ROLE),
      type: 'success',
    };
    return res.redirect(`/role/update/${id}`);
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('UPDATE_ERROR', routeNames.USER_ROLE),
      type: 'danger',
    };
    return res.redirect(`/role/update/${id}`);
  }
};

exports.deleteUserRole = async (req, res) => {
  const { id } = req.params;
  try {
    const found = await DB.UserRole.findOne({
      where: {
        id,
      },
    });
    if (!found) {
      return res.redirect('/role/list');
    }
    const usersWithTheRole = await DB.User.findAll({
      where: {
        roleId: id,
      },
      raw: true,
    });
    for (const user of usersWithTheRole) {
      await DB.User.update({
        roleId: null,
      },
      {
        where: {
          roleId: user.roleId,
        },
        raw: true,
      });
    }
    await DB.RoleCompetency.destroy({
      where: {
        roleId: id,
      },
    });
    await DB.UserRole.destroy({
      where: {
        id,
      },
    });
    req.session.flashMessages = {
      message: i18n.__('DELETED', routeNames.USER_ROLE),
      type: 'success',
    };
    return res.redirect('/role/list');
  } catch (ex) {
    req.session.flashMessages = {
      message: i18n.__('DELETE_ERROR', routeNames.USER_ROLE),
      type: 'danger',
    };
    return res.redirect('/role/list');
  }
};
