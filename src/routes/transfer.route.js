const transferController = require('../controllers/transfer.controller');

const routes = (app) => {
  app
    .route('/transfer')
    .get(transferController.addTransfer);
};

module.exports = routes;
