const { getMessage, messageEnum } = require('../messages/messageCodes');
const db = require('../config/db');

const ROUTE_NAME = 'Otopark';

exports.listParkingLots = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
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
  return res.render('layouts/main', {
    partialName: 'listParkingLots',
    parkinglotList,
    success: successMessage,
    error: errorMessage,
  });
};

exports.addParkingLotView = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
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
    success: successMessage,
    error: errorMessage,
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
    return res.redirect(`/parkinglot/add?${messageEnum.success.add}`);
  } catch (error) {
    return res.redirect(`/parkinglot/add?${messageEnum.error.add}`);
  }
};

exports.updateParkingLotView = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(ROUTE_NAME, req.query);
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
      error: errorMessage,
      success: successMessage,
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
    return res.redirect(`/parkinglot/update/${parkingLot.id}?${messageEnum.success.update}`);
  } catch (error) {
    return res.redirect(`/parkinglot/update/${parkingLot.id}?${messageEnum.error.update}`);
  }
};

exports.deleteParkingLot = async (req, res) => {
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
    return res.redirect(`/parkinglot/list?${messageEnum.success.delete}`);
  } catch (error) {
    return res.redirect(`/parkinglot/list?${messageEnum.error.delete}`);
  }
};
