const parkingLotController = require('../controllers/parkingLot.controller');

const routes = (app) => {
  app
    .route(['/parkinglot', '/parkinglot/list'])
    .get(parkingLotController.listParkingLots);

  app
    .route('/parkinglot/add')
    .get(parkingLotController.addParkingLotView)
    .post(parkingLotController.addNewParkingLot);

  app
    .route('/parkinglot/update/:id?')
    .get(parkingLotController.updateParkingLotView)
    .post(parkingLotController.updateParkingLot);

  app
    .route('/parkinglot/delete/:id?')
    .get(parkingLotController.deleteParkingLot);
};

module.exports = routes;
