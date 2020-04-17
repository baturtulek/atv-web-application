const additionalFeeController = require('../controllers/additionalFee.controller');

const routes = (app) => {
  app
    .route(['/additionalfee', '/additionalfee/list'])
    .get(additionalFeeController.listAdditionalFees);

  app
    .route('/additionalfee/add')
    .get(additionalFeeController.addAdditionalFeeView)
    .post(additionalFeeController.addAdditionalFee);

  app
    .route('/additionalfee/update/:id?')
    .get(additionalFeeController.updateAdditionalFeeView)
    .post(additionalFeeController.updateAdditionalFee);

  app
    .route('/additionalfee/delete/:id?')
    .get(additionalFeeController.deleteAdditionalFee);
};

module.exports = routes;
