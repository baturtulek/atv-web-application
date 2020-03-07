/* eslint-disable consistent-return */
const { getMessage, messageEnum } = require('../messages/messageCodes');
const db = require('../config/db');

const ROUTE_NAME = 'Araç Tipi';

exports.addVehicleType = async (req, res) => {
  const { name, description } = req.body;
  try {
    const vehicleType = await db.VehicleType.create({
      name,
      description,
    });
    if (vehicleType) {
      return res.redirect(`/vehicletype/add?${messageEnum.success.add}`);
    }
  } catch (error) {
    return res.redirect(`/vehicletype/add?${messageEnum.error.add}`);
  }
};

exports.addVehicleTypeView = (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
  res.render('layouts/main', {
    partialName: 'addVehicleType',
    endPoint: 'add',
    success: successMessage,
    error: errorMessage,
  });
};

exports.listVehicleType = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
  const vehicleTypes = await db.VehicleType.findAll({
    raw: true,
  });

  if (vehicleTypes) {
    return res.render('layouts/main', {
      partialName: 'listVehicleTypes',
      vehicleTypes,
      success: successMessage,
      error: errorMessage,
    });
  }
};

exports.updateVehicleTypeView = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
  const { id } = req.params;
  try {
    const vehicleType = await db.VehicleType.findOne({
      where: { id },
      raw: true,
    });
    if (!vehicleType) {
      return res.redirect('/vehicletype/list');
    }
    return res.render('layouts/main', {
      partialName: 'addVehicleType',
      endPoint: 'update',
      vehicleType,
      success: successMessage,
      error: errorMessage,
    });
  } catch (error) {
    return res.redirect('/vehicletype/list');
  }
};


exports.updateVehicleType = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    await db.VehicleType.update(
      { name, description },
      { where: { id } },
    );
    return res.redirect(`/vehicletype/update/${id}?${messageEnum.success.update}`);
  } catch (error) {
    return res.redirect(`/vehicletype/update/${id}?${messageEnum.error.update}`);
  }
};

exports.deleteVehicleType = async (req, res) => {
  const { id } = req.params;
  try {
    const type = await db.VehicleType.findOne({
      where: {
        id,
      },
    });
    if (!type) {
      return res.redirect('/vehicletype/list');
    }
    await db.VehicleType.destroy({
      where: {
        id,
      },
    });
    return res.redirect(`/vehicletype/list?${messageEnum.success.delete}`);
  } catch (error) {
    return res.redirect(`/vehicletype/list?${messageEnum.error.delete}`);
  }
};
