const userRoleController = require('../controllers/userRole.controller');

const routes = (app) => {
  app
    .route('/role/add')
    .get(userRoleController.userRoleView)
    .post(userRoleController.addUserRole);
  app.route('/role/list').get(userRoleController.listUserRoles);
  app
    .route('/role/delete')
    .get(userRoleController.userRoleDeleteView)
    .post(userRoleController.deleteUserRole);
};

module.exports = routes;
