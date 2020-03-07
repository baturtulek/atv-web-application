const userRoleController = require('../controllers/userRole.controller');

const routes = (app) => {
  app
    .route(['role', '/role/list'])
    .get(userRoleController.listUserRoles);

  app
    .route('/role/add')
    .get(userRoleController.addUserRoleView)
    .post(userRoleController.addUserRole);

  app
    .route('/role/update/:id?')
    .get(userRoleController.userRoleUpdateView)
    .post(userRoleController.userRoleUpdate);

  app
    .route('/role/delete/:id?')
    .get(userRoleController.deleteUserRole);
};

module.exports = routes;
