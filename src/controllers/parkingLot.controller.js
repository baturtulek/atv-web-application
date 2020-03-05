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
    success: req.session.success,
    fail: req.session.fail,
    message: req.session.message,
  });
};

exports.addNewParkingLot = async (req, res) => {
  const parkingLot = req.body;
  try {
    await db.ParkingLot.create({
      name: parkingLot.name,
      address: parkingLot.address,
      description: parkingLot.description,
      staffId: parkingLot.staffId,
      parkingTypeId: parkingLot.parkingTypeId,
    });
    req.session.success = true;
    req.session.message = 'Otopark başarıyla eklendi.';
    return res.redirect('/parkinglot/add');
  } catch (error) {
    req.session.fail = true;
    req.session.message = 'Otopark eklenirken hata oluştu.';
    return res.redirect('/parkinglot/add');
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
  const parkingLot = req.body;
  try {
    await db.ParkingLot.update(
      {
        name: parkingLot.name,
        address: parkingLot.address,
        description: parkingLot.description,
        staffId: parkingLot.staffId,
        parkingTypeId: parkingLot.parkingTypeId,
      },
      {
        where: {
          id: parkingLot.id,
        },
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
      success: 'Otopark başarıyla güncellendi.',
      parkingLotType,
      parkingLotUsers,
      parkingLot,
    });
  } catch (error) {
    return res.render('layouts/main', { partialName: 'addParkingLots', fail: 'Otopark güncellenirken hata oluştu.' });
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
