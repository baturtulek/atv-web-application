const userRoleController = require('../controllers/userRole.controller');
const { validateUserAndNavigate } = require('../utils/authentication');

const routes = (app) => {
  app
    .route('/role/add')
    .get(
      validateUserAndNavigate,
      userRoleController.addUserRoleView,
    )
    .post(
      validateUserAndNavigate,
      userRoleController.addUserRole,
    );

  app
    .route('/role/list')
    .get(
      validateUserAndNavigate,
      userRoleController.listUserRoles,
    );
  app
    .route('/role/delete')
    .get(
      validateUserAndNavigate,
      userRoleController.userRoleDeleteView,
    )
    .post(
      validateUserAndNavigate,
      userRoleController.deleteUserRole,
    );
};

module.exports = routes;
