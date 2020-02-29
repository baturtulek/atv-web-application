/* eslint-disable consistent-return */
const db = require('../config/db');

exports.addVehicleType = async (req, res) => {
  const { name, description } = req.body;
  try {
    const vehicleType = await db.VehicleType.create({
      name,
      description,
    });
    if (vehicleType) {
      const success = true;
      return res.render('layouts/main', { partialName: 'addVehicleType', success });
    }
  } catch (error) {
    const fail = true;
    return res.render('layouts/main', { partialName: 'addVehicleType', fail });
  }
};

exports.listVehicleType = async (req, res) => {
  const vehicleTypes = await db.VehicleType.findAll({
    raw: true,
  });

  if (vehicleTypes) {
    return res.render('layouts/main', { partialName: 'listVehicleTypes', vehicleTypes });
  }
};

exports.addVehicleTypeView = async (req, res) => res.render('layouts/main', { partialName: 'addVehicleType' });
