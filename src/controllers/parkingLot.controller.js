const db = require('../config/db');

exports.listParkingLots = async (req, res) => {
  const parkinglotList = await db.ParkingLot.findAll({
    raw: true,
    include: [
      {
        model: db.ParkingType,
        attributes: ['description'],
      },
      {
        model: db.User,
        attributes: ['name', 'surname'],
      },
    ],
  });
  return res.render('layouts/main', { partialName: 'listParkingLots', parkinglotList });
};

exports.addParkingLotView = async (req, res) => {
  const parkingLotType = await db.ParkingType.findAll({
    raw: true,
  });
  const parkingLotUsers = await db.User.findAll({
    where: {
      roleId: 2,
    },
    raw: true,
  });
  return res.render('layouts/main', {
    partialName: 'addParkingLots',
    endPoint: 'add',
    parkingLotType,
    parkingLotUsers,
  });
};

exports.addNewParkingLot = async (req, res) => {
  const {
    name, description, staffId, parkingTypeId, address,
  } = req.body;
  try {
    await db.ParkingLot.create({
      name,
      address,
      description,
      staffId,
      parkingTypeId,
    });
    const parkingLotType = await db.ParkingType.findAll({
      raw: true,
    });
    const parkingLotUsers = await db.User.findAll({
      where: {
        roleId: 2,
      },
      raw: true,
    });
    return res.render('layouts/main', {
      partialName: 'addParkingLots',
      endPoint: 'add',
      parkingLotType,
      parkingLotUsers,
      success: 'Otopark başarıyla eklendi.',
    });
  } catch (error) {
    return res.render('layouts/main', { partialName: 'addParkingLots', fail: true });
  }
};

exports.updateParkingLotView = async (req, res) => {
  const { id } = req.params;
  const parkingLotType = await db.ParkingType.findAll({
    raw: true,
  });
  const parkingLotUsers = await db.User.findAll({
    where: {
      roleId: 2,
    },
    raw: true,
  });
  try {
    const parkingLot = await db.ParkingLot.findOne({
      where: { id },
      raw: true,
    });
    if (!parkingLot) {
      return res.redirect('/parkinglot/list');
    }
    return res.render('layouts/main', {
      partialName: 'addParkingLots',
      endPoint: 'update',
      parkingLotType,
      parkingLotUsers,
      parkingLot,
    });
  } catch (error) {
    return res.redirect('/parkinglot/list');
  }
};

exports.updateParkingLot = async (req, res) => {
  const {
    id, name, address, description, staffId, parkingTypeId,
  } = req.body;
  try {
    await db.ParkingLot.update(
      {
        name,
        address,
        description,
        staffId,
        parkingTypeId,
      },
      {
        where: { id },
        raw: true,
      },
    );
    const parkingLotType = await db.ParkingType.findAll({
      raw: true,
    });
    const parkingLotUsers = await db.User.findAll({
      where: {
        roleId: 2,
      },
      raw: true,
    });
    return res.render('layouts/main', {
      partialName: 'addParkingLots',
      endPoint: 'update',
      parkingLotType,
      parkingLotUsers,
      success: 'Otopark başarıyla güncellendi.',
    });
  } catch (error) {
    return res.render('layouts/main', { partialName: 'addParkingLots', fail: true });
  }
};

exports.deleteParkingLots = async (req, res) => {
  const { id } = req.params;
  try {
    const parkingLot = await db.ParkingLot.findOne({
      where: { id },
    });
    if (!parkingLot) {
      return res.redirect('/parkinglot/list');
    }
    await db.ParkingLot.destroy({
      where: { id },
    });
    return res.redirect('/parkinglot/list');
  } catch (error) {
    return res.redirect('/parkinglot/list');
  }
};
