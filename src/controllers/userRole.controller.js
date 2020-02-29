/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
const httpStatus = require('http-status');
const db = require('../config/db');

exports.addUserRoleView = async (req, res) => {
  try {
    const competencies = await db.Competency.findAll({
      raw: true,
    });
    if (competencies) {
      return res.render('layouts/main', { partialName: 'addUserRole', competencies });
    }
    return res.status(httpStatus.NOT_FOUND).json({
      message: 'there is no record to show',
    });
  } catch (exception) {
    console.log(exception);
  }
};

exports.addUserRole = async (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line prefer-const
  let { role, ...competencyIds } = req.body;
  competencyIds = Object.keys(competencyIds);
  competencyIds.forEach((element, index) => {
    // eslint-disable-next-line radix
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
      if (createdRole) {
        const result = {
          message: `Record has been added role = ${role}`,
          success: true,
        };
        return res.status(httpStatus.CREATED).json(result); // return the appropiate view that confirms vehicle has been added
      }
    } else {
      return res.status(httpStatus.CONFLICT).json({
        message: `there is already a record role = ${role}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line consistent-return
exports.listUserRoles = async (req, res) => {
  try {
    const allUserRoles = await db.UserRole.findAll({
      raw: true,
    });
    if (allUserRoles) {
      console.log(allUserRoles);
      return JSON.stringify(allUserRoles);
    }
    return res.status(httpStatus.NOT_FOUND).json({
      message: 'there is no record to show',
    });
  } catch (exception) {
    console.log(exception);
  }
};

exports.userRoleDeleteView = async (req, res) => res.status(httpStatus.OK).json({
  message: 'You\'re logged in. this should show userRoleDeleteView',
});

exports.deleteUserRole = async (req, res) => {
  const { role } = req.body;
  try {
    const found = await db.UserRole.findOne({
      where: {
        role,
      },
    });
    if (!found) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: `UserRole not found with the role of ${role}`,
      });
    }
    await db.UserRole.destroy({
      where: {
        role,
      },
    });
    return res.status(httpStatus.OK).json({
      message: `competency deleted with the role of ${role}`,
    });
  } catch (ex) {
    console.log(ex);
  }
};
