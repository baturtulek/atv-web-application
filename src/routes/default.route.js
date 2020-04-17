const parkingLotController = require('../controllers/parkingLot.controller');

const routes = (app) => {
  app
    .route('/')
    .get(parkingLotController.listParkingLots);
};

module.exports = routes;
