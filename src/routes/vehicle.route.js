const vehicleController = require('../controllers/vehicle.controller');

const routes = (app) => {
  app
    .route('/vehicle/add')
    .get(vehicleController.addVehicleView)
    .post(vehicleController.addVehicle);

  app
    .route('/vehicle/add/private')
    .post(vehicleController.addPrivateVehicle);
  app
    .route(['/vehicle/search', '/vehicle/search/:state'])
    .get(vehicleController.searchVehicleView)
    .post(vehicleController.searchVehicle);

  app
    .route('/vehicle/photos')
    .get(vehicleController.vehiclePhoto);

  app
    .route('/vehicle/exit')
    .get(vehicleController.exitVehicleView)
    .post(vehicleController.exitVehicle);

  app
    .route('/vehicle/calculate')
    .post(vehicleController.calculatePrice);

  app
    .route('/vehicle/:plate')
    .post(vehicleController.getVehicleByPlate);

  app
    .route('/vehicle/edit/:plate')
    .get(vehicleController.editVehicleView)
    .post(vehicleController.editVehicle);
};

module.exports = routes;
