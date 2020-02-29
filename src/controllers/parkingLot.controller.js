const db = require('../config/db');

exports.listParkingLots = async (req, res) => {
  if (res.locals.session.user) {
    const parkinglot = await db.ParkingLot.findAll({
      raw: true,
      include: [
        {
          model: db.ParkingType,
          attributes: ['description'],
        },
      ],
    });
    return res.render('layouts/main', { partialName: 'listParkingLots', parkinglot });
  }
  return res.redirect('/auth/login');
};

exports.addParkingLotView = async (req, res) => {
  if (res.locals.session.user) {
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
  }
  return res.redirect('/auth/login');
};

exports.addNewParkingLot = async (req, res) => {
  if (res.locals.session.user) {
    const { description, staffId, parkingTypeId } = req.body;
    try {
      const newParkingLot = await db.ParkingLot.create({
        description,
        staffId,
        parkingTypeId,
      });
      if (newParkingLot) {
        const result = {
          message: 'Parking Lot added!',
        };
        return res.status(201).json(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return res.redirect('/auth/login');
};
