const vehicleTypeController = require('../controllers/vehicleType.controller');

const routes = (app) => {
  app
    .route(['/vehicletype', '/vehicletype/list'])
    .get(vehicleTypeController.listVehicleType);

  app
    .route('/vehicletype/add')
    .get(vehicleTypeController.addVehicleTypeView)
    .post(vehicleTypeController.addVehicleType);

  app
    .route('/vehicletype/update/:id?')
    .get(vehicleTypeController.updateVehicleTypeView)
    .post(vehicleTypeController.updateVehicleType);

  app
    .route('/vehicletype/delete/:id?')
    .get(vehicleTypeController.deleteVehicleType);
};

module.exports = routes;
