const discountController = require('../controllers/discount.controller');

const routes = (app) => {
  app
    .route(['/discount', '/discount/list'])
    .get(discountController.listDiscounts);

  app
    .route('/discount/add')
    .get(discountController.addDiscountView)
    .post(discountController.addDiscount);

  app
    .route('/discount/update/:id?')
    .get(discountController.updateDiscountView)
    .post(discountController.updateDiscount);

  app
    .route('/discount/delete/:id?')
    .get(discountController.deleteDiscount);
};

module.exports = routes;
