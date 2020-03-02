const profileController = require('../controllers/profile.controller');
const { validateUserAndNavigate } = require('../utils/authentication');

const routes = (app) => {
  app
    .route('/profile')
    .get(
      validateUserAndNavigate,
      profileController.profileView,
    );
  app
    .route('/profile/info')
    .post(
      validateUserAndNavigate,
      profileController.updateProfileInfo,
    );
  app
    .route('/profile/password')
    .post(
      validateUserAndNavigate,
      profileController.updateProfilePassword,
    );
};

module.exports = routes;
