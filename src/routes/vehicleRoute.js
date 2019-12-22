const vehicleController = require('../controllers/vehicleController');

const routes = (app) => {
    app.route('/vehicle/add')
        .get(vehicleController.addVehicleGET)
        .post(vehicleController.addVehiclePOST);
    app.route('/vehicle/search')
        .get(vehicleController.searchVehicleGET)
        .post(vehicleController.searchVehiclePOST);
}

module.exports = routes;