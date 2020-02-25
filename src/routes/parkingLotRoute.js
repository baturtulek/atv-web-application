const express = require('express');
const parkingLotController = require('../controllers/parkingLot.controller');
const router = express.Router();

router.get('/list', parkingLotController.listParkingLots);
router.get('/add', parkingLotController.addParkingLotView);
router.post('/add', parkingLotController.addNewParkingLot);


module.exports = router;
