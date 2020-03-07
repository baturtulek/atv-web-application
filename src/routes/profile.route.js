const profileController = require('../controllers/profile.controller');

const routes = (app) => {
  app
    .route('/profile')
    .get(profileController.profileView);

  app
    .route('/profile/update/info')
    .post(profileController.updateProfileInfo);

  app
    .route('/profile/update/password')
    .post(profileController.updateProfilePassword);
};

module.exports = routes;
