const competencyController = require('../controllers/competency.controller');
const { validateUserAndNavigate } = require('../utils/authentication');

const routes = (app) => {
  app
    .route('/competency/list')
    .get(
      validateUserAndNavigate,
      competencyController.listCompetency,
    );

  app
    .route('/competency/add')
    .get(
      validateUserAndNavigate,
      competencyController.addCompetencyView,
    )
    .post(
      validateUserAndNavigate,
      competencyController.addCompetency,
    );

  app
    .route('/competency/delete/:id?')
    .get(
      validateUserAndNavigate,
      competencyController.deleteCompetency,
    )
    .post(
      validateUserAndNavigate,
      competencyController.deleteCompetency,
    );
};

module.exports = routes;
