/* eslint-disable radix */
const httpStatus = require('http-status');
const db = require('../config/db');

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
  if (req.session.user) {
    return res.status(200).json({
      message: 'You\'re logged in. this should show searchVehicleView', // return searchVehicleView
    });
  }
  return res.status(403).json({
    message: 'You\'re not logged in. this should redirect auth view or given an appropiate error view', // not logged in redirect auth
  });
};

exports.searchVehicle = async (req, res) => {
  const { plate } = req.body;
  try {
    const foundVehicle = await db.TowedVehicle.findOne({
      where: {
        plate,
      },
      raw: true,
      include: [
        {
          model: db.User,
        },
      ],
    });

    if (!foundVehicle) {
      const result = {
        message: `There is no record with the plate = ${plate} added by tow driver`,
        success: false,
      };
      return res.status(401).json(result); // return no record with given plate view
    }

    return res.json(foundVehicle);
  } catch (err) {
    console.log(err);
  }
};
