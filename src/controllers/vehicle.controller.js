const moment = require('moment');
const httpStatus = require('http-status');
const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { DB } = require('../services/sequelize');
const { getFormattedTimeStamp } = require('../utils/timezoneHelpers');

const statusIdOtopark = async () => {
  const vehicleStatus = await DB.VehicleState.findOne({
    where: {
      description: 'Otoparkta',
    },
  });
  return vehicleStatus;
};

exports.addVehicleView = async (req, res) => {
  try {
    const vehiclePlates = await DB.TowedVehicle.findAll({
      raw: true,
      where: {
        stateId: 2,
      },
    });

    const [vehicleTypes, vehicleColors, vehicleBodyTypes, vehicleBrands, vehicleStates] = await Promise.all([
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
    ]);
    return res.render('layouts/main', {
      partialName: 'entranceVehicle',
      vehiclePlates,
      vehicleTypes,
      vehicleColors,
      vehicleBodyTypes,
      vehicleBrands,
      vehicleStates,
    });
  } catch (error) {
    console.log('error');
  }
};

exports.addVehicle = async (req, res) => {
  const vehicle = req.body;
  try {
    const towedVehicle = await DB.TowedVehicle.findOne({
      where: {
        plate: vehicle.plate,
      },
    });
    if (!towedVehicle) {
      const result = {
        message: `There is no record with the plate = ${vehicle.plate} added by tow driver`,
        success: false,
      };
      // return no record with given plate view
      return res.status(httpStatus.NOT_FOUND).json(result);
    }

    const date = getFormattedTimeStamp('YYYY-MM-DD HH:mm:ss');

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

    const vehicleStatus = await DB.VehicleState.findOne({
      where: {
        description: 'Transfer Halinde',
      },
    });

    await DB.TowedVehicle.update(
      { stateId: vehicle.stateId, entranceParkingLotDate: date },
      { where: { stateId: parseInt(vehicleStatus.id), plate: vehicle.plate } },
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

    const vehicleStatus = await statusIdOtopark();

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
          plate, stateId: parseInt(vehicleStatus.id),
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
    });
  } catch (err) {
    console.log('ERROR', err);
    return res.redirect('/vehicle/search');
  }
};

exports.exitVehicle = async (req, res) => {
  const {
    plate, exitDate, towedDate, receiver, 
  } = req.body;
  try {
    const vehicleStatusExit = await DB.VehicleState.findOne({
      where: {
        description: 'Çıkış Yaptı',
      },
    });
    const vehicleStatus = await statusIdOtopark();
    await DB.TowedVehicle.update(
      {
        stateId: parseInt(vehicleStatusExit.id),
        exitParkingLotDate: exitDate,
        receiver,
      },
      {
        where: {
          plate, towedDate, stateId: parseInt(vehicleStatus.id),
        },
        raw: true,
      },
    );

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
    let resultPrice = +((dayDiff) * (vehicleFee.fee)) + +(vehicle.additionalFee);

    if (roleDiscount) {
      // eslint-disable-next-line max-len
      resultPrice -= ((resultPrice) * (roleDiscount.parkDiscount)) / (100);
    }
    console.log('vehicle', vehicle);
    console.log('result price', resultPrice);
    await DB.TowedVehicle.update(
      {
        price: resultPrice,
      },
      {
        where: {
          plate: vehicle.plate, towedDate: vehicle.towedDate,
        },
        raw: true,
      },
    );

    return res.status(200).json({
      price: resultPrice,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};
