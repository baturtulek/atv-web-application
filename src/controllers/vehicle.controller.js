const moment = require('moment');
const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { DB } = require('../services/sequelize');
const { getFormattedTimeStamp } = require('../utils/timezoneHelpers');

// const statusIdOtopark = async () => {
//   const vehicleStatus = await DB.VehicleState.findOne({
//     where: {
//       description: 'Otoparkta',
//     },
//   });
//   return vehicleStatus;
// };

const upsertVehicle = async (vehicle) => {
  await DB.Vehicle.upsert({
    plate: vehicle.plate,
    chassisNo: vehicle.chassisNo,
    trusteeNo: vehicle.trusteeNo,
    vehicleTypeId: parseInt(vehicle.vehicleTypeId),
    engineNo: vehicle.engineNo,
    colorId: parseInt(vehicle.colorId),
    modelYear: parseInt(vehicle.modelYear),
    bodyTypeId: parseInt(vehicle.bodyTypeId),
    brandId: parseInt(vehicle.brandId),
    ownerProfileId: parseInt(vehicle.ownerProfileId),
  });
};

exports.vehiclePhoto = async (req, res) => {
  const plate = req.query.plate;
  const toweddate = req.query.toweddate;
  return res.render('layouts/main', {
    partialName: 'listVehiclePhotos',
    plate,
    toweddate,
  });
};

exports.addVehicleView = async (req, res) => {
  try {
    const vehiclePlates = await DB.TowedVehicle.findAll({
      raw: true,
      where: {
        active: 1,
      },
    });

    const [vehicleTypes, vehicleColors, vehicleBodyTypes, vehicleBrands, vehicleStates, parkingLots] = await Promise.all([
      DB.VehicleType.findAll({
        raw: true,
      }),
      DB.VehicleColor.findAll({
        raw: true,
      }),
      DB.VehicleBodyStyle.findAll({
        raw: true,
      }),
      DB.VehicleBrand.findAll({
        raw: true,
      }),
      DB.VehicleState.findAll({
        raw: true,
      }),
      DB.ParkingLot.findAll({
        raw: true,
      }),
    ]);
    return res.render('layouts/main', {
      partialName: 'entranceVehicle',
      vehiclePlates,
      vehicleTypes,
      vehicleColors,
      vehicleBodyTypes,
      vehicleBrands,
      vehicleStates,
      parkingLots,
    });
  } catch (error) {
    return res.render('layouts/main', {
      partialName: 'entranceVehicle',
    });
  }
};

exports.addVehicle = async (req, res) => {
  const vehicle = req.body;
  try {
    const towedVehicle = await DB.TowedVehicle.findOne({
      where: {
        plate: vehicle.plate, active: 1,
      },
    });
    if (!towedVehicle) {
      req.session.flashMessages = {
        message: i18n.__('SEARCH_ERROR', routeNames.VEHICLE),
        type: 'danger',
      };
      return res.redirect('/vehicle/add');
    }

    const date = getFormattedTimeStamp('YYYY-MM-DD HH:mm:ss');
    if (!towedVehicle.entranceParkingLotDate) {
      console.log('even if there is entrance parking lot date', towedVehicle.entranceParkingLotDate);
      await upsertVehicle(vehicle);
      await DB.TowedVehicle.update(
        { stateId: vehicle.stateId, entranceParkingLotDate: date, parkingLotId: vehicle.parkingLotId },
        { where: { active: 1, plate: vehicle.plate } },
      );
    } else {
      await DB.TowedVehicle.update(
        { stateId: vehicle.stateId, parkingLotId: vehicle.parkingLotId },
        { where: { active: 1, plate: vehicle.plate } },
      );
    }

    await DB.Transfer.update(
      { entranceParkingLotDate: date },
      {
        where: {
          parkingLotId: vehicle.parkingLotId, towedDate: towedVehicle.towedDate, plate: vehicle.plate, entranceParkingLotDate: null,
        },
      },
    );

    req.session.flashMessages = {
      message: i18n.__('ADDED', routeNames.VEHICLE),
      type: 'success',
    };
    return res.redirect('/vehicle/add');
  } catch (exception) {
    req.session.flashMessages = {
      message: i18n.__('ADD_ERROR', routeNames.VEHICLE),
      type: 'danger',
    };
    return res.redirect('/vehicle/add');
  }
};

exports.searchVehicleView = async (req, res) => {
  const vehicleStates = await DB.VehicleState.findAll({
    raw: true,
  });

  return res.render('layouts/main', {
    partialName: 'searchVehicle',
    vehicleStates,
  });
};

exports.searchVehicle = async (req, res) => {
  const {
    plate, stateId, parkingLotEntranceBegin, parkingLotEntranceEnd,
    parkingLotExitBegin, parkingLotExitEnd,
  } = req.body;
  const whereStatement = {};

  try {
    const { Op } = DB.Sequelize;
    whereStatement.active = 1;
    whereStatement.plate = {
      [Op.like]: `%${plate}%`,
    };
    if (stateId) {
      whereStatement.stateId = stateId;
    }
    if (parkingLotEntranceBegin && parkingLotEntranceEnd) {
      whereStatement.entranceParkingLotDate = {
        [Op.and]: {
          [Op.gte]: parkingLotEntranceBegin,
          [Op.lte]: parkingLotEntranceEnd,
        },
      };
    } else if (parkingLotEntranceBegin && !parkingLotEntranceEnd) {
      whereStatement.entranceParkingLotDate = {
        [Op.gte]: parkingLotEntranceBegin,
      };
    } else if (!parkingLotEntranceBegin && parkingLotEntranceEnd) {
      whereStatement.entranceParkingLotDate = {
        [Op.lte]: parkingLotEntranceEnd,
      };
    }

    if (parkingLotExitBegin && parkingLotExitEnd) {
      whereStatement.exitParkingLotDate = {
        [Op.and]: {
          [Op.gte]: parkingLotExitBegin,
          [Op.lte]: parkingLotExitEnd,
        },
      };
    } else if (parkingLotExitBegin && !parkingLotExitEnd) {
      whereStatement.exitParkingLotDate = {
        [Op.gte]: parkingLotExitBegin,
      };
    } else if (!parkingLotExitBegin && parkingLotExitEnd) {
      whereStatement.exitParkingLotDate = {
        [Op.lte]: parkingLotExitEnd,
      };
    }

    const vehicles = await DB.TowedVehicle.findAll({
      raw: true,
      include: [
        {
          model: DB.Vehicle,
          attributes: ['chassisNo', 'modelYear'],
        },
        {
          model: DB.ParkingLot,
          attributes: ['name'],
        },
        {
          model: DB.VehicleState,
          attributes: ['description'],
        },
      ],
      where: whereStatement,
    });

    const parkingLots = await DB.ParkingLot.findAll({
      raw: true,
    });

    const vehicleStates = await DB.VehicleState.findAll({
      raw: true,
    });

    if (!vehicles.length > 0) {
      req.session.flashMessages = {
        message: i18n.__('SEARCH_ERROR', routeNames.VEHICLE),
        type: 'danger',
      };
      return res.redirect('/vehicle/search');
    }
    return res.render('layouts/main', {
      partialName: 'searchVehicle',
      vehicles,
      parkingLots,
      vehicleStates,
    });
  } catch (err) {
    req.session.flashMessages = {
      message: i18n.__('SEARCH_ERROR', routeNames.VEHICLE),
      type: 'danger',
    };
    console.log('err', err);
    return res.redirect('/vehicle/search');
  }
};

exports.exitVehicleView = async (req, res) => {
  const { plate } = req.query;
  try {
    const exitDate = getFormattedTimeStamp('YYYY-MM-DD HH:mm:ss');

    const [towVehicle, vehicle, additionalFee, vehicleTypes] = await Promise.all([
      DB.TowedVehicle.findOne({
        include: [
          {
            model: DB.User,
            attributes: ['name', 'surname'],
          },
          {
            model: DB.ParkingLot,
            attributes: ['name'],
          },
        ],
        where: {
          plate, active: 1,
        },
        raw: true,
      }),
      DB.Vehicle.findOne({
        where: {
          plate,
        },
        raw: true,
      }),
      DB.AdditionalFee.findAll({
        raw: true,
      }),
      DB.VehicleType.findAll({
        raw: true,
      }),
    ]);

    const transfers = await DB.Transfer.findAll({
      include: [
        {
          model: DB.User,
          attributes: ['name', 'surname'],
        },
        {
          model: DB.ParkingLot,
          attributes: ['name'],
        },
      ],
      where: {
        plate, towedDate: towVehicle.towedDate,
      },
      raw: true,
    });

    console.log('TRANSFERS', transfers);

    if (!vehicle) {
      return res.redirect('/vehicle/search');
    }

    const discountByRole = await DB.Discount.findAll({
      raw: true,
    });

    return res.render('layouts/main', {
      partialName: 'exitVehicle',
      discountByRole,
      towVehicle,
      vehicle,
      vehicleTypes,
      exitDate,
      additionalFee,
      transfers,
    });
  } catch (err) {
    console.log('ERROR', err);
    return res.redirect('/vehicle/search');
  }
};

exports.exitVehicle = async (req, res) => {
  const {
    plate, exitDate, towedDate, discount, discountRoleId, receiver, fullPrice, discountPrice, parkingLotId,
  } = req.body;
  try {
    const vehicleStatusExit = await DB.VehicleState.findOne({
      where: {
        description: 'Çıkış Yaptı',
      },
    });

    await Promise.all([
      DB.TowedVehicle.update(
        {
          stateId: parseInt(vehicleStatusExit.id),
          exitParkingLotDate: exitDate,
        },
        {
          where: {
            plate, active: 1,
          },
          raw: true,
        },
      ),
      DB.Price.create(
        {
          plate,
          towedDate,
          roleId: discountRoleId,
          discount,
          receiver,
          fullPrice,
          discountPrice,
        },
        {
          raw: true,
        },
      ),
      DB.Transfer.update(
        { exitParkingLotDate: exitDate, isInParkingLot: 1 },
        {
          where: {
            plate, towedDate, parkingLotId, isInParkingLot: null,
          },
        },
      ),
    ]);
    req.session.flashMessages = {
      message: i18n.__('EXIT_VEHICLE_SUCCESS', routeNames.VEHICLE),
      type: 'success',
    };
    return res.redirect('/vehicle/search');
  } catch (err) {
    req.session.flashMessages = {
      message: i18n.__('EXIT_VEHICLE_ERROR', routeNames.VEHICLE),
      type: 'danger',
    };
    return res.redirect(`/vehicle/exit?plate=${plate}`);
  }
};

exports.calculatePrice = async (req, res) => {
  const vehicle = req.body;
  const entranceDate = moment(vehicle.entranceParkingLotDate);
  const exitDate = moment(vehicle.exitDate);

  let roleDiscount = null;

  const dayDiff = exitDate.diff(entranceDate, 'hours');

  try {
    const vehicleFee = await DB.VehicleType.findOne({
      attributes: ['fee'],
      raw: true,
      where: {
        id: vehicle.vehicleTypeId,
      },
    });

    if (vehicle.discount) {
      roleDiscount = await DB.Discount.findOne({
        attributes: ['parkDiscount'],
        raw: true,
        where: {
          id: vehicle.discountRoleId,
        },
      });
    }

    // eslint-disable-next-line max-len
    const fullPrice = +((dayDiff) * (vehicleFee.fee)) + +(vehicle.additionalFee);
    let discountPrice = null;
    if (roleDiscount) {
      // eslint-disable-next-line max-len
      discountPrice = (fullPrice) - ((fullPrice) * (roleDiscount.parkDiscount)) / (100);
    }

    return res.status(200).json({
      fullPrice,
      discountPrice,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.getVehicleByPlate = async (req, res) => {
  const { plate } = req.params;

  try {
    const vehicle = await DB.Vehicle.findOne({
      raw: true,
      where: {
        plate,
      },
    });

    if (vehicle) {
      return res.status(200).json({
        data: vehicle,
      });
    }
    return res.status(404).json({
      data: vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      result: 'Error',
    });
  }
};
