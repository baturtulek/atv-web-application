const vehicleController = require('../controllers/vehicle.controller');
const { validateUserAndNavigate } = require('../utils/authentication');

const routes = (app) => {
  app
    .route('/vehicle/add')
    .get(
      vehicleController.addVehicleView,
    )
    .post(
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
