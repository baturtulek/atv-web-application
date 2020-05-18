const createReportController = require('../controllers/reports.controller');

const routes = (app) => {
  app
    .route('/reports/byday')
    .get(createReportController.createReportByDayView)
    .post(createReportController.createReportByDay);
  app
    .route('/reports/towedBy')
    .get(createReportController.towedByReportView)
    .post(createReportController.towedByReport);
  app
    .route('/reports/vehiclesInParkingLot')
    .get(createReportController.vehiclesInParkingLotReportView)
    .post(createReportController.vehiclesInParkingLotReport);
  app
    .route('/reports/outgoingVehicles')
    .get(createReportController.outgoingVehiclesReportView)
    .post(createReportController.outgoingVehiclesReport);
  app
    .route('/reports/parkingLotZ')
    .get(createReportController.parkingLotZReportView)
    .post(createReportController.parkingLotZReport);
};

module.exports = routes;
