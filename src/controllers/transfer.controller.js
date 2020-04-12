const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { DB } = require('../services/sequelize');

exports.addTransfer = async (req, res) => {
  const [parkingLots, vehicleStates] = await Promise.all([
    await DB.ParkingLot.findAll({
      raw: true,
    }),
    await DB.VehicleState.findAll({
      raw: true,
    }),
  ]);

  res.render('layouts/main', {
    partialName: 'addTransfer',
    parkingLots,
    vehicleStates,
  });
};
