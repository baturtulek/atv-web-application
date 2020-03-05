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

  app
    .route('/user/update/:id?')
    .get(
      validateUserAndNavigate,
      userController.updateUserView,
    )
    .post(
      validateUserAndNavigate,
      userController.updateUser,
    );

  app
    .route('/user/delete/:id?')
    .get(
      validateUserAndNavigate,
      userController.deleteUser,
    );
};

module.exports = routes;
