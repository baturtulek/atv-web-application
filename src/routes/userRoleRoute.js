const userRoleController = require("../controllers/userRoleController");

const routes = app => {
  app
    .route("/role/add")
    .get(userRoleController.userRoleView)
    .post(userRoleController.addUserRole);
  app.route("/role/list").get(userRoleController.listUserRoles);
  app
    .route("/role/delete")
    .get(userRoleController.userRoleDeleteView)
    .post(userRoleController.deleteUserRole);
};

module.exports = routes;
