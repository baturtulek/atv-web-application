const parkingLotController = require('../controllers/parkingLot.controller');
const { validateUserAndNavigate } = require('../utils/authentication');

const routes = (app) => {
  app
    .route('/')
    .get(
      validateUserAndNavigate,
      parkingLotController.listParkingLots,
    );
};

module.exports = routes;
