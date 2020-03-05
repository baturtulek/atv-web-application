const vehicleController = require('../controllers/vehicle.controller');
const { validateUserAndNavigate } = require('../utils/authentication');

const routes = (app) => {
  app
    .route('/vehicle/add')
    .get(
      validateUserAndNavigate,
      vehicleController.addVehicleView,
    )
    .post(
      validateUserAndNavigate,
      vehicleController.addVehicle,
    );

  app
    .route('/vehicle/search')
    .get(
      validateUserAndNavigate,
      vehicleController.searchVehicleView,
    )
    .post(
      validateUserAndNavigate,
      vehicleController.searchVehicle,
    );
};

module.exports = routes;
