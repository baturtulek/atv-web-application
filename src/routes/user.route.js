const userController = require('../controllers/user.controller');
const { validateUserAndNavigate } = require('../utils/authentication');

const routes = (app) => {
  app
    .route('/user/list')
    .get(
      validateUserAndNavigate,
      userController.listUserView,
    );

  app
    .route('/user/add')
    .get(
      validateUserAndNavigate,
      userController.addUserView,
    )
    .post(
      validateUserAndNavigate,
      userController.addUser,
    );
};

module.exports = routes;
