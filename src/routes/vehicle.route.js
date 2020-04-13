const vehicleController = require('../controllers/vehicle.controller');

const routes = (app) => {
  app
    .route('/vehicle/add')
    .get(vehicleController.addVehicleView)
    .post(vehicleController.addVehicle);

  app
    .route('/vehicle/search')
    .get(vehicleController.searchVehicleView)
    .post(vehicleController.searchVehicle);

  app
    .route('/vehicle/exit')
    .get(vehicleController.exitVehicleView)
    .post(vehicleController.exitVehicle);
  app
    .route('/vehicle/calculate')
    .post(vehicleController.calculatePrice);
};

module.exports = routes;
