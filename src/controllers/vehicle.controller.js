/* eslint-disable radix */
const httpStatus = require('http-status');
const moment = require('moment');
const db = require('../config/db');
const { RESPONSE_MESSAGE } = require('../messages');

const ROUTE_NAME = 'Araç';

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

    const date = moment().locale('tr').tz('Europe/Istanbul').format('LLLL');

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
      entranceDate: date,
    });

    if (createdVehicle) {
      await db.TowedVehicle.update(
        { stateId: vehicle.stateId },
        { where: { stateId: 2, plate: vehicle.plate } },
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
    const vehicles = await db.Vehicle.findAll({
      include: [{
        model: db.TowedVehicle,
        where: { stateId: 1 },
      }],
      where: {
        plate,
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
    return res.redirect('/vehicle/search');
  }
};
