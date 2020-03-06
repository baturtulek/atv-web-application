/* eslint-disable consistent-return */
const { getMessage } = require('../messages/messageCodes');
const db = require('../config/db');

exports.addVehicleType = async (req, res) => {
  const { name, description } = req.body;
  try {
    const vehicleType = await db.VehicleType.create({
      name,
      description,
    });
    if (vehicleType) {
      return res.redirect('/vehicletype/add?success=vehicletype_added');
    }
  } catch (error) {
    return res.redirect('/vehicletype/add?error=vehicletype_add_error');
  }
};

exports.addVehicleTypeView = (req, res) => {
  const { errorMessage, successMessage } = getMessage(req.query);
  res.render('layouts/main', {
    partialName: 'addVehicleType',
    endPoint: 'add',
    success: successMessage,
    error: errorMessage,
  });
};

exports.listVehicleType = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(req.query);
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
  const { errorMessage, successMessage } = getMessage(req.query);
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
    return res.redirect(`/vehicletype/update/${id}?success=vehicletype_updated`);
  } catch (error) {
    return res.redirect(`/vehicletype/update/${id}?error=vehicletype_update_error`);
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
    return res.redirect('/vehicletype/list?success=vehicletype_deleted');
  } catch (error) {
    return res.redirect('/vehicletype/list?error=vehicletype_delete_error');
  }
};
