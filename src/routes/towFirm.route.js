const towFirmController = require('../controllers/towFirm.controller');

const routes = (app) => {
  app
    .route(['/towfirm', '/towfirm/list'])
    .get(towFirmController.listTowFirms);

  app
    .route('/towfirm/add')
    .get(towFirmController.addTowFirmView)
    .post(towFirmController.addTowFirm);

  app
    .route('/towfirm/update/:id?')
    .get(towFirmController.updateTowFirmView)
    .post(towFirmController.updateTowFirm);

  app
    .route('/towfirm/delete/:id?')
    .get(towFirmController.deleteTowFirm);
};

module.exports = routes;
