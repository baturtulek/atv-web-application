const annualLeaveController = require('../controllers/annualLeave.controller');

const routes = (app) => {
  app
    .route('/annualleave/request')
    .get(annualLeaveController.requestAnnualLeaveView)
    .post(annualLeaveController.requestAnnualLeave);

  app
    .route('/annualleave/list')
    .get(annualLeaveController.annualLeaveList);
  app
    .route('/annualleave/list/:result')
    .get(annualLeaveController.acceptAnnualLeaveRequest);
};

module.exports = routes;
