const { db } = require('../models/DB');
const { RESPONSE_MESSAGE } = require('../messages');

const ROUTE_NAME = 'Araç Tipi';

exports.addVehicleTypeView = (req, res) => {
  res.render('layouts/main', {
    partialName: 'addVehicleType',
    endPoint: 'add',
  });
};

exports.addVehicleType = async (req, res) => {
  const { name, description, fee } = req.body;
  try {
    const vehicleType = await db.VehicleType.create({
      name,
      description,
      fee,
    });
    if (vehicleType) {
      req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.ADDED}`, type: 'success' };
      return res.redirect('/vehicletype/add');
    }
  } catch (error) {
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.ADD_ERROR}`, type: 'danger' };
    return res.redirect('/vehicletype/add');
  }
};

exports.listVehicleType = async (req, res) => {
  const vehicleTypes = await db.VehicleType.findAll({
    raw: true,
  });
  if (vehicleTypes) {
    return res.render('layouts/main', {
      partialName: 'listVehicleTypes',
      vehicleTypes,
    });
  }
};

exports.updateVehicleTypeView = async (req, res) => {
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
    });
  } catch (error) {
    return res.redirect('/vehicletype/list');
  }
};

exports.updateVehicleType = async (req, res) => {
  const { id } = req.params;
  const { name, description, fee } = req.body;

  try {
    await db.VehicleType.update(
      { name, description, fee },
      { where: { id } },
    );
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATED}`, type: 'success' };
    return res.redirect(`/vehicletype/update/${id}`);
  } catch (error) {
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.UPDATE_ERROR}`, type: 'danger' };
    return res.redirect(`/vehicletype/update/${id}`);
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
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.DELETED}`, type: 'success' };
    return res.redirect('/vehicletype/list');
  } catch (error) {
    req.session.flashMessages = { message: `${ROUTE_NAME} ${RESPONSE_MESSAGE.DELETE_ERROR}`, type: 'danger' };
    return res.redirect('/vehicletype/list');
  }
};
