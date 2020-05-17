const mainPageController = require('../controllers/mainPage.controller');

const routes = (app) => {
  app
    .route('/mainpage')
    .get(mainPageController.listAnnouncements);
};

module.exports = routes;