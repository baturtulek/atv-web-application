const httpStatus = require('http-status');
const db = require('../config/db');
const helper = require('../shared/helper');

exports.userRoleView = async (req, res) => {
  if (helper.IsAuthorized(req, res)) {
    return res.status(httpStatus.OK).json({
      message: 'You\'re logged in. this should show userRoleView', // return searchVehicleView
    });
  }
};

exports.addUserRole = async (req, res) => {
  if (helper.IsAuthorized) {
    const { role } = req.body;
    try {
      const found = await db.UserRole.findOne({
        where: {
          role,
        },
      });

      if (!found) {
        const createdRole = await db.UserRole.create({
          role,
        });
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
  }
};

// eslint-disable-next-line consistent-return
exports.listUserRoles = async (req, res) => {
  if (helper.IsAuthorized(req, res)) {
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
  }
};

exports.userRoleDeleteView = async (req, res) => {
  if (helper.IsAuthorized(req, res)) {
    return res.status(httpStatus.OK).json({
      message: 'You\'re logged in. this should show userRoleDeleteView',
    });
  }
};

exports.deleteUserRole = async (req, res) => {
  if (helper.IsAuthorized(req, res)) {
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
  }
};
