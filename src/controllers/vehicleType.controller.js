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
      req.session.success = true;
      req.session.message = 'Araç tipi başarıyla eklendi.';
      return res.redirect('/vehicletype/add');
    }
  } catch (error) {
    req.session.fail = true;
    req.session.message = 'Araç tipi eklenirken hata oluştu.';
    return res.redirect('/vehicletype/add');
  }
};

exports.addVehicleTypeView = (req, res) => {
  res.render('layouts/main', {
    partialName: 'addVehicleType',
    endPoint: 'add',
    success: req.session.success,
    fail: req.session.fail,
    message: req.session.message,
  });
};

exports.listVehicleType = async (req, res) => {
  const vehicleTypes = await db.VehicleType.findAll({
    raw: true,
  });

  if (vehicleTypes) {
    return res.render('layouts/main', {
      partialName: 'listVehicleTypes',
      vehicleTypes,
      success: req.session.success,
      fail: req.session.fail,
      message: req.session.message,
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
  const { name, description } = req.body;

  try {
    await db.VehicleType.update(
      { name, description },
      { where: { id } },
    );
    req.session.success = true;
    req.session.message = 'Araç tipi başarıyla güncellendi.';
    return res.redirect('/vehicletype/list');
  } catch (error) {
    req.session.fail = true;
    req.session.message = 'Araç tipi eklenirken hata oluştu.';
    return res.redirect('/vehicletype/list');
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
    req.session.success = true;
    req.session.message = 'Araç tipi başarıyla silindi.';
    return res.redirect('/vehicletype/list');
  } catch (error) {
    req.session.fail = true;
    req.session.message = 'Araç tipi maalesef silinemedi.';
    return res.redirect('/vehicletype/list');
  }
};
