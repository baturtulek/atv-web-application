const authController = require('../controllers/auth.controller');
const { validateUserAndNavigate } = require('../utils/authentication');

const routes = (app) => {
  app
    .route('/login')
    .get(authController.loginView)
    .post(authController.login);
  app
    .route('/logout')
    .get(
      validateUserAndNavigate,
      authController.logout,
    );
};

module.exports = routes;
