const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { DB } = require('../services/sequelize');

exports.addVehicleTypeView = (req, res) => {
  res.render('layouts/main', {
    partialName: 'addVehicleType',
    endPoint: 'add',
  });
};

exports.addVehicleType = async (req, res) => {
  const { name, description, fee } = req.body;
  try {
    const vehicleType = await DB.VehicleType.create({
      name,
      description,
      fee,
    });
    if (vehicleType) {
      req.session.flashMessages = {
        message: i18n.__('ADDED', routeNames.VEHICLE_TYPE),
        type: 'success',
      };
      return res.redirect('/vehicletype/add');
    }
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('ADD_ERROR', routeNames.VEHICLE_TYPE),
      type: 'danger',
    };
    return res.redirect('/vehicletype/add');
  }
};

exports.listVehicleType = async (req, res) => {
  const vehicleTypes = await DB.VehicleType.findAll({
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
    const vehicleType = await DB.VehicleType.findOne({
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
    await DB.VehicleType.update(
      { name, description, fee },
      { where: { id } },
    );
    req.session.flashMessages = {
      message: i18n.__('UPDATED', routeNames.VEHICLE_TYPE),
      type: 'success',
    };
    return res.redirect(`/vehicletype/update/${id}`);
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('UPDATE_ERROR', routeNames.VEHICLE_TYPE),
      type: 'danger',
    };
    return res.redirect(`/vehicletype/update/${id}`);
  }
};

exports.deleteVehicleType = async (req, res) => {
  const { id } = req.params;
  try {
    const type = await DB.VehicleType.findOne({
      where: {
        id,
      },
    });
    if (!type) {
      return res.redirect('/vehicletype/list');
    }
    await DB.VehicleType.destroy({
      where: {
        id,
      },
    });
    req.session.flashMessages = {
      message: i18n.__('DELETED', routeNames.VEHICLE_TYPE),
      type: 'success',
    };
    return res.redirect('/vehicletype/list');
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('DELETE_ERROR', routeNames.VEHICLE_TYPE),
      type: 'danger',
    };
    return res.redirect('/vehicletype/list');
  }
};
