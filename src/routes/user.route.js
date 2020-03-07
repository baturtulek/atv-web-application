const userController = require('../controllers/user.controller');

const routes = (app) => {
  app
    .route(['/user', '/user/list'])
    .get(userController.listUserView);

  app
    .route('/user/add')
    .get(userController.addUserView)
    .post(userController.addUser);

  app
    .route('/user/update/:id?')
    .get(userController.updateUserView)
    .post(userController.updateUser);

  app
    .route('/user/delete/:id?')
    .get(userController.deleteUser);
};

module.exports = routes;
