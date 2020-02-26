const competencyController = require('../controllers/competency.controller');

const routes = (app) => {
  app
    .route('/competency/add')
    .get(competencyController.competencyView)
    .post(competencyController.addCompetency);
  app.route('/competency/list').get(competencyController.listCompetency);
  app
    .route('/competency/delete')
    .get(competencyController.competencyDeleteView)
    .post(competencyController.deleteCompetency);
};

module.exports = routes;
