/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
const { Op } = require('sequelize');
const db = require('../config/db');
const { getMessage } = require('../messages/messageCodes');

const ROUTE_NAME = 'Profil';

exports.listUserRoles = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
  try {
    const userRoleList = await db.UserRole.findAll({
      raw: true,
    });
    return res.render('layouts/main', {
      partialName: 'listUserRole',
      userRoleList,
      success: successMessage,
      error: errorMessage,
    });
  } catch (exception) {
    console.log(exception);
  }
};

exports.addUserRoleView = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
  try {
    const competencies = await db.Competency.findAll({
      raw: true,
    });

    return res.render('layouts/main', {
      partialName: 'addUserRole',
      endPoint: 'add',
      competencies,
      success: successMessage,
      error: errorMessage,
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
    const found = await db.UserRole.findOne({
      where: {
        role,
      },
    });

    if (!found && role !== '') {
      const createdRole = await db.UserRole.create({
        role,
      });

      for (const id of competencyIds) {
        if (!isNaN(id)) {
          await db.RoleCompetency.create({
            roleId: createdRole.id,
            competencyNo: id,
          });
        }
      }
      return res.redirect('/role/add?success=added');
    }
    return res.redirect('/role/add?error=in_use');
  } catch (error) {
    console.log(error);
    return res.redirect('/role/add?error=add_error');
  }
};

exports.userRoleUpdateView = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
  const { id } = req.params;
  try {
    const role = await db.UserRole.findOne({
      raw: true,
      where: {
        id,
      },
    });
    if (!role) return res.redirect('/role/list');
    const competencies = await db.Competency.findAll({
      raw: true,
    });
    let userRoleCompetencies = await db.RoleCompetency.findAll({
      raw: true,
      where: {
        roleId: id,
      },
    });
    userRoleCompetencies.forEach((element, index) => {
      userRoleCompetencies[index] = element.competencyNo;
    });
    userRoleCompetencies = await db.Competency.findAll({
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
      error: errorMessage,
      success: successMessage,
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
    const foundRole = await db.UserRole.findOne({
      where: {
        id,
      },
    });

    if (!foundRole) return res.redirect(`/role/update/${id}/?error=update_error`);

    await db.UserRole.update({
      role,
    },
    {
      where: {
        id,
      },
      raw: true,
    });

    for (const competencyNo of competencyIds) {
      if (!isNaN(id)) {
        await db.RoleCompetency.upsert({
          roleId: id,
          competencyNo,
        },
        {
          raw: true,
        });
      }
    }

    return res.redirect(`/role/update/${id}?success=updated`);
  } catch (error) {
    console.log(error);
    return res.redirect(`/role/update/${id}?error=update_error`);
  }
};

exports.deleteUserRole = async (req, res) => {
  // const { id } = req.params;
  // try {
  //   const found = await db.UserRole.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  //   if (!found) {
  //     return res.redirect('/role/list');
  //   }
  //   await db.UserRole.destroy({
  //     where: {
  //       id,
  //     },
  //   });
  //   return res.redirect('/role/list?success=deleted');
  // } catch (ex) {
  //   console.log(ex);
  //   return res.redirect('/role/list?error=delete_error');
  // }
  return res.json({
    message: 'not implemented',
  });
};
