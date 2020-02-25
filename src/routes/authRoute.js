const authController = require("../controllers/authController");
const routes = app => {
  app
    .route("/auth/login")
    .get(authController.loginView)
    .post(authController.login);
  app.route("/auth/logout").get(authController.logout);
};

module.exports = routes;
