const enforcementOfficeController = require('../controllers/enforcementOffice.controller');

const routes = (app) => {
  app
    .route(['/enforcementoffice', '/enforcementoffice/list'])
    .get(enforcementOfficeController.listEnforcementOffices);

  app
    .route('/enforcementoffice/add')
    .get(enforcementOfficeController.addEnforcementOfficeView)
    .post(enforcementOfficeController.addEnforcementOffice);

  app
    .route('/enforcementoffice/update/:id?')
    .get(enforcementOfficeController.updateEnfocementOfficeView)
    .post(enforcementOfficeController.updateEnfocementOffice);

  app
    .route('/enforcementoffice/delete/:id?')
    .get(enforcementOfficeController.deleteEnfocementOffice);
};

module.exports = routes;
