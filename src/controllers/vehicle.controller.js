/* eslint-disable radix */
const httpStatus = require('http-status');
const moment = require('moment');
const db = require('../config/db');
const { RESPONSE_MESSAGE } = require('../messages');

const ROUTE_NAME = 'Araç';

const statusIdOtopark = async () => {
  const vehicleStatus = await db.VehicleState.findOne({
    where: {
      description: 'Otoparkta',
    },
  });
  return vehicleStatus;
};

exports.addVehicleView = async (req, res) => {
  const vehiclePlates = await db.TowedVehicle.findAll({
    raw: true,
    where: {
      stateId: 2,
    },
  });

  const vehicleTypes = await db.VehicleType.findAll({
    raw: true,
  });

  const vehicleColors = await db.VehicleColor.findAll({
    raw: true,
  });

  const vehicleBodyTypes = await db.VehicleBodyStyle.findAll({
    raw: true,
  });

  const vehicleBrands = await db.VehicleBrand.findAll({
    raw: true,
  });

  const vehicleStates = await db.VehicleState.findAll({
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
    const towedVehicle = await db.TowedVehicle.findOne({
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

    const createdVehicle = await db.Vehicle.create({
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

    const vehicleStatus = await db.VehicleState.findOne({
      where: {
        description: 'Transfer Halinde',
      },
    });

    if (createdVehicle) {
      await db.TowedVehicle.update(
        { stateId: vehicle.stateId, entranceParkingLotDate: date },
        { where: { stateId: parseInt(vehicleStatus.id), plate: vehicle.plate } },
      );
      // return the appropiate view that confirms vehicle has been added
      return res.redirect('/vehicle/add');
    }
  } catch (exception) {
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
    const vehicleStatus = await statusIdOtopark();
    const vehicles = await db.TowedVehicle.findAll({
      include: [
        {
          model: db.Vehicle,
          attributes: ['chassisNo', 'modelYear'],
        },
      ],
      where: {
        plate, stateId: parseInt(vehicleStatus.id),
      },
      raw: true,
    });
    if (!vehicles.length > 0) {
      req.session.flashMessages = {
        message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.SEARCH_ERROR}`,
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
      message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.SEARCH_ERROR}`,
      type: 'danger',
    };
    console.log('err', err);
    return res.redirect('/vehicle/search');
  }
};

exports.outVehicleView = async (req, res) => {
  const { plate } = req.body;
  const vehicleStatus = await statusIdOtopark();
  const towVehicle = await db.TowedVehicle.findOne({
    where: {
      plate, stateId: parseInt(vehicleStatus.id),
    },
    raw: true,
  });

  const vehicle = await db.Vehicle.findOne({
    where: {
      plate,
    },
    raw: true,
  });

  const vehicleTypes = await db.VehicleType.findAll({
    raw: true,
  });

  if (!vehicle) {
    res.redirect('/vehicle/search');
  }

  const discountByRole = await db.Discount.findAll({
    raw: true,
  });

  console.log('vehicles', vehicle);
  console.log('discount', discountByRole);
  // newDate.locale('tr').format('LLLL')
  // const entrance = moment(vehicle.entranceParkingLotDate);
  // const now = moment().tz('Europe/Istanbul');
  // const diff = now.diff(entrance, 'h');
  return res.render('layouts/main', {
    partialName: 'outVehicle',
    discountByRole,
    towVehicle,
    vehicle,
    vehicleTypes,
  });
};
