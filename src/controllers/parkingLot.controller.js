const i18n = require('../services/i18n');
const routeNames = require('../locales/routeNamesTR.json');
const { DB } = require('../services/sequelize');

exports.listParkingLots = async (req, res) => {
  const parkinglotList = await DB.ParkingLot.findAll({
    raw: true,
    include: [
      {
        model: DB.ParkingType,
        attributes: ['description'],
      },
      {
        model: DB.User,
        attributes: ['name', 'surname'],
      },
    ],
  });
  return res.render('layouts/main', {
    partialName: 'listParkingLots',
    parkinglotList,
  });
};

exports.addParkingLotView = async (req, res) => {
  const parkingLotType = await DB.ParkingType.findAll({
    raw: true,
  });
  const parkingLotUsers = await DB.User.findAll({
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
  const parkingLot = req.body;
  try {
    await DB.ParkingLot.create({
      name: parkingLot.name,
      address: parkingLot.address,
      description: parkingLot.description,
      staffId: parkingLot.staffId,
      parkingTypeId: parkingLot.parkingTypeId,
    });
    req.session.flashMessages = {
      message: i18n.__('ADDED', routeNames.PARKING_LOT),
      type: 'success',
    };
    return res.redirect('/parkinglot/add');
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('ADD_ERROR', routeNames.PARKING_LOT),
      type: 'danger',
    };
    return res.redirect('/parkinglot/add');
  }
};

exports.updateParkingLotView = async (req, res) => {
  const { id } = req.params;
  const parkingLotType = await DB.ParkingType.findAll({
    raw: true,
  });
  const parkingLotUsers = await DB.User.findAll({
    where: {
      roleId: 2,
    },
    raw: true,
  });
  try {
    const parkingLot = await DB.ParkingLot.findOne({
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
    await DB.ParkingLot.update(
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
    req.session.flashMessages = {
      message: i18n.__('UPDATED', routeNames.PARKING_LOT),
      type: 'success',
    };
    return res.redirect(`/parkinglot/update/${parkingLot.id}`);
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('UPDATE_ERROR', routeNames.PARKING_LOT),
      type: 'danger',
    };
    return res.redirect(`/parkinglot/update/${parkingLot.id}`);
  }
};

exports.deleteParkingLot = async (req, res) => {
  const { id } = req.params;
  try {
    const parkingLot = await DB.ParkingLot.findOne({
      where: { id },
    });
    if (!parkingLot) {
      return res.redirect('/parkinglot/list');
    }
    await DB.ParkingLot.destroy({
      where: { id },
    });
    req.session.flashMessages = {
      message: i18n.__('DELETED', routeNames.PARKING_LOT),
      type: 'success',
    };
    return res.redirect('/parkinglot/list');
  } catch (error) {
    req.session.flashMessages = {
      message: i18n.__('DELETE_ERROR', routeNames.PARKING_LOT),
      type: 'danger',
    };
    return res.redirect('/parkinglot/list');
  }
};
