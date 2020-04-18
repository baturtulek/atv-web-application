const createReportController = require('../controllers/reports.controller');

const routes = (app) => {
  app
    .route('/reports/byday')
    .get(createReportController.createReportByDayView)
    .post(createReportController.createReportByDay);
};

module.exports = routes;
