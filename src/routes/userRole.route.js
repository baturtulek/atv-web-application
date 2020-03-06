const userRoleController = require('../controllers/userRole.controller');
const { validateUserAndNavigate } = require('../utils/authentication');

const routes = (app) => {
  app
    .route(['role', '/role/list'])
    .get(
      validateUserAndNavigate,
      userRoleController.listUserRoles,
    );

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
    .route('/role/update/:id?')
    .get(
      validateUserAndNavigate,
      userRoleController.userRoleUpdateView,
    )
    .post(
      validateUserAndNavigate,
      userRoleController.userRoleUpdate,
    );

  app
    .route('/role/delete/:id?')
    .get(
      validateUserAndNavigate,
      userRoleController.deleteUserRole,
    );
};

module.exports = routes;
