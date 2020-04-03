const httpStatus = require('http-status');
const moment = require('moment');
const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { DB } = require('../services/sequelize');

const statusIdOtopark = async () => {
  const vehicleStatus = await DB.VehicleState.findOne({
    where: {
      description: 'Otoparkta',
    },
  });
  return vehicleStatus;
};

exports.addVehicleView = async (req, res) => {
  const vehiclePlates = await DB.TowedVehicle.findAll({
    raw: true,
    where: {
      stateId: 2,
    },
  });

  const vehicleTypes = await DB.VehicleType.findAll({
    raw: true,
  });

  const vehicleColors = await DB.VehicleColor.findAll({
    raw: true,
  });

  const vehicleBodyTypes = await DB.VehicleBodyStyle.findAll({
    raw: true,
  });

  const vehicleBrands = await DB.VehicleBrand.findAll({
    raw: true,
  });

  const vehicleStates = await DB.VehicleState.findAll({
    raw: true,
  });

  return res.render('layouts/main', {
    partialName: 'entranceVehicle',
    vehiclePlates,
    vehicleTypes,
    vehicleColors,
    vehicleBodyTypes,
    vehicleBrands,
    vehicleStates,
  });
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

    const date = moment().tz('Europe/Istanbul').format();

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

exports.searchVehicleView = (req, res) => {
  return res.render('layouts/main', {
    partialName: 'searchVehicle',
  });
};

exports.searchVehicle = async (req, res) => {
  const { plate } = req.body;
  try {
    const { Op } = DB.Sequelize;
    const vehicleStatus = await statusIdOtopark();
    const vehicles = await DB.TowedVehicle.findAll({
      include: [
        {
          model: DB.Vehicle,
          attributes: ['chassisNo', 'modelYear'],
        },
      ],
      where: {
        plate: {
          [Op.like]: `%${plate}%`,
        },
        stateId: parseInt(vehicleStatus.id),
      },
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
    const vehicleStatus = await statusIdOtopark();
    const towVehicle = await DB.TowedVehicle.findOne({
      where: {
        plate, stateId: parseInt(vehicleStatus.id),
      },
      raw: true,
    });

    const vehicle = await DB.Vehicle.findOne({
      where: {
        plate,
      },
      raw: true,
    });

    const vehicleTypes = await DB.VehicleType.findAll({
      raw: true,
    });

    if (!vehicle) {
      return res.redirect('/vehicle/search');
    }

    const discountByRole = await DB.Discount.findAll({
      raw: true,
    });
    // newDate.locale('tr').format('LLLL')
    // const entrance = moment(vehicle.entranceParkingLotDate);
    // const now = moment().tz('Europe/Istanbul');
    // const diff = now.diff(entrance, 'h');
    return res.render('layouts/main', {
      partialName: 'exitVehicle',
      discountByRole,
      towVehicle,
      vehicle,
      vehicleTypes,
    });
  } catch (err) {
    return res.redirect('/vehicle/search');
  }
};

exports.exitVehicle = async (req, res) => {
  const { plate } = req.body;
  try {
    const exitDate = moment().tz('Europe/Istanbul').format();
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
      },
      {
        where: {
          plate, stateId: parseInt(vehicleStatus.id),
        },
        raw: true,
      },
    );
    // newDate.locale('tr').format('LLLL')
    // const entrance = moment(vehicle.entranceParkingLotDate);
    // const now = moment().tz('Europe/Istanbul');
    // const diff = now.diff(entrance, 'h');
    req.session.flashMessages = {
      message: i18n.__('EXIT_VEHICLE_SUCCESS', routeNames.VEHICLE),
      type: 'success',
    };
    return res.redirect('/vehicle/search');
  } catch (err) {
    return res.redirect('/vehicle/search');
  }
};
