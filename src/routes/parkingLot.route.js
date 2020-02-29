const parkingLotController = require('../controllers/parkingLot.controller');
const { validateUserAndNavigate } = require('../utils/authentication');

const routes = (app) => {
  app
    .route('/parkinglot/list')
    .get(
      validateUserAndNavigate,
      parkingLotController.listParkingLots,
    );
  app
    .route('/parkinglot/add')
    .get(
      validateUserAndNavigate,
      parkingLotController.addParkingLotView,
    )
    .post(
      validateUserAndNavigate,
      parkingLotController.addNewParkingLot,
    );
};

module.exports = routes;
