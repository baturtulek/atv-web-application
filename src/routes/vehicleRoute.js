const vehicleController = require("../controllers/vehicleController");

const routes = app => {
  app
    .route("/vehicle/add")
    .get(vehicleController.addVehicleView)
    .post(vehicleController.addVehicle);
  app
    .route("/vehicle/search")
    .get(vehicleController.searchVehicleView)
    .post(vehicleController.searchVehicle);
};

module.exports = routes;
