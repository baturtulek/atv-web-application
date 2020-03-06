const discountController = require('../controllers/discount.controller');
const { validateUserAndNavigate } = require('../utils/authentication');

const routes = (app) => {
  app
    .route(['/discount', '/discount/list'])
    .get(
      validateUserAndNavigate,
      discountController.listDiscounts,
    );

  app
    .route('/discount/add')
    .get(
      validateUserAndNavigate,
      discountController.addDiscountView,
    )
    .post(
      validateUserAndNavigate,
      discountController.addDiscount,
    );

  app
    .route('/discount/update/:id?')
    .get(
      validateUserAndNavigate,
      discountController.updateDiscountView,
    )
    .post(
      validateUserAndNavigate,
      discountController.updateDiscount,
    );
  app
    .route('/discount/delete/:id?')
    .get(
      validateUserAndNavigate,
      discountController.deleteDiscount,
    );
};

module.exports = routes;
