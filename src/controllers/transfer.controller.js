const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { DB } = require('../services/sequelize');
const { getFormattedTimeStamp } = require('../utils/timezoneHelpers');

exports.addTransferView = async (req, res) => {
  const [staffs, parkingLots, vehicleStates] = await Promise.all([
    DB.User.findAll({
      raw: true,
    }),
    DB.ParkingLot.findAll({
      raw: true,
    }),
    DB.VehicleState.findAll({
      raw: true,
    }),
  ]);
  const exitDate = getFormattedTimeStamp('YYYY-MM-DD HH:mm:ss');

  return res.render('layouts/main', {
    partialName: 'addTransfer',
    parkingLots,
    vehicleStates,
    exitDate,
    staffs,
  });
};

exports.addTransfer = async (req, res) => {
  const {
    plate, previousParkingLotId, nextParkingLotId, isInParkingLot, staffId, stateId, exitDate,
  } = req.body;

  try {
    await DB.TowedVehicle.update(
      { stateId, parkingLotId: nextParkingLotId },
      { where: { plate, active: 1 } },
    );

    const towedVehicle = await DB.TowedVehicle.findOne({
      raw: true,
      where: { plate, active: 1 },
    });

    if (isInParkingLot == 1) {
      await DB.Transfer.update(
        { exitParkingLotDate: exitDate, isInParkingLot: parseInt(isInParkingLot) },
        {
          where: {
            plate, towedDate: towedVehicle.towedDate, parkingLotId: previousParkingLotId, isInParkingLot: null,
          },
        },
      );
    } else {
      await DB.Transfer.update(
        { isInParkingLot: parseInt(isInParkingLot) },
        {
          where: {
            plate, towedDate: towedVehicle.towedDate, parkingLotId: previousParkingLotId, isInParkingLot: null,
          },
        },
      );
    }

    await DB.Transfer.create(
      {
        plate,
        towedDate: towedVehicle.towedDate,
        staffId,
        parkingLotId: nextParkingLotId,
      },
      {
        raw: true,
      },
    );

    req.session.flashMessages = {
      message: i18n.__('COMPLETED', routeNames.TRANSFER),
      type: 'success',
    };

    return res.redirect('/transfer');
  } catch (err) {
    req.session.flashMessages = {
      message: i18n.__('INCOMPLETED', routeNames.TRANSFER),
      type: 'danger',
    };
    console.log('ERROR', err);
    return res.redirect('/transfer');
  }
};
