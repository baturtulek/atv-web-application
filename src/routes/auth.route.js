const authController = require('../controllers/auth.controller');

const routes = (app) => {
  app
    .route('/login')
    .get(authController.loginView)
    .post(authController.login);

  app
    .route('/logout')
    .get(authController.logout);
};

module.exports = routes;
