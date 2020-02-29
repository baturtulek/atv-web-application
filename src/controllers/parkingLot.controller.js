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
    parkingLotType,
    parkingLotUsers,
  });
};

exports.addNewParkingLot = async (req, res) => {
  const {
    name, description, staffId, parkingTypeId,
  } = req.body;
  try {
    const newParkingLot = await db.ParkingLot.create({
      name,
      description,
      staffId,
      parkingTypeId,
    });
    if (newParkingLot) {
      return res.redirect('/parkinglot/list');
    }
  } catch (error) {
    console.log(error);
  }
};
