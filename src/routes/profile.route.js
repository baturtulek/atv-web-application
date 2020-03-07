const profileController = require('../controllers/profile.controller');

const routes = (app) => {
  app
    .route('/profile')
    .get(profileController.profileView);

  app
    .route('/profile/info')
    .post(profileController.updateProfileInfo);

  app
    .route('/profile/password')
    .post(profileController.updateProfilePassword);
};

module.exports = routes;
