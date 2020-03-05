const { getMessage } = require('../messages/messageCodes');
const db = require('../config/db');

exports.listParkingLots = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(req.query);
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
  const { errorMessage, successMessage } = getMessage(req.query);
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
    return res.redirect('/parkinglot/add?success=parkinglot_added');
  } catch (error) {
    return res.redirect('/parkinglot/add?error=parkinglot_add_error');
  }
};

exports.updateParkingLotView = async (req, res) => {
  const { errorMessage, successMessage } = getMessage(req.query);
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
    return res.redirect(`/parkinglot/update/${parkingLot.id}?success=parkinglot_updated`);
  } catch (error) {
    return res.redirect(`/parkinglot/update/${parkingLot.id}?error=parkinglot_update_error`);
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
    return res.redirect('/parkinglot/list?success=parkinglot_deleted');
  } catch (error) {
    return res.redirect('/parkinglot/list?error=parkinglot_delete_error');
  }
};
