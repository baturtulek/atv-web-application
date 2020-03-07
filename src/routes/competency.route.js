const competencyController = require('../controllers/competency.controller');

const routes = (app) => {
  app
    .route('/competency/list')
    .get(competencyController.listCompetency);

  app
    .route('/competency/add')
    .get(competencyController.addCompetencyView)
    .post(competencyController.addCompetency);

  app
    .route('/competency/delete/:id?')
    .get(competencyController.deleteCompetency)
    .post(competencyController.deleteCompetency);
};

module.exports = routes;
