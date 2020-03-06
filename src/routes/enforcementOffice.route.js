const enforcementOfficeController = require('../controllers/enforcementOffice.contorller');
const { validateUserAndNavigate } = require('../utils/authentication');

const routes = (app) => {
  app
    .route(['/enforcementoffice', '/enforcementoffice/list'])
    .get(
      validateUserAndNavigate,
      enforcementOfficeController.listEnforcementOffices,
    );

  app
    .route('/enforcementoffice/add')
    .get(
      validateUserAndNavigate,
      enforcementOfficeController.addEnforcementOfficeView,
    )
    .post(
      validateUserAndNavigate,
      enforcementOfficeController.addEnforcementOffice,
    );

  app
    .route('/enforcementoffice/update/:id?')
    .get(
      validateUserAndNavigate,
      enforcementOfficeController.updateEnfocementOfficeView,
    )
    .post(
      validateUserAndNavigate,
      enforcementOfficeController.updateEnfocementOffice,
    );
  app
    .route('/enforcementoffice/delete/:id?')
    .get(
      validateUserAndNavigate,
      enforcementOfficeController.deleteEnfocementOffice,
    );
};

module.exports = routes;
