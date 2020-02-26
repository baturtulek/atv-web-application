const parkingLotController = require('../controllers/parkingLot.controller');

const routes = (app) => {
  app
    .route('/parkinglot/list')
    .get(parkingLotController.listParkingLots);
  app
    .route('/parkinglot/add')
    .get(parkingLotController.addParkingLotView)
    .post(parkingLotController.addParkingLotView);
};

module.exports = routes;
