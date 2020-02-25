const db = require('../config/db');

const ParkingType = require('../models/PARKING_TYPE')(db.connection, db.Sequelize);

exports.listParkingLots = async (req, res) => {
  const parkinglot = await db.ParkingLot.findAll({
    raw: true,
    include: [{
      model: ParkingType,
      attributes: ['description']
     }]
  });
  res.render('partials/listParkingLots', { parkinglot: parkinglot });
};


exports.addParkingLotView = async (req, res) => {
  const parkingLotType = await db.ParkingType.findAll({
    raw: true,
  });
  const parkingLotUsers = await db.User.findAll({
    where: {
      roleId: 2
    },
    raw: true,
  });
  console.log(parkingLotUsers);
  res.render('partials/addParkingLots',
  {
    parkingLotType: parkingLotType,
    parkingLotUsers: parkingLotUsers
  });
};

exports.addNewParkingLot = async (req, res) => {
  const { description, staffId, parkingTypeId} = req.body;
  try {
    const newParkingLot = await db.ParkingLot.create({
      description,
      staffId,
      parkingTypeId,
    });
    if(newParkingLot) {
      const result = {
          message: `Parking Lot added!`
      };
      return res.status(201).json(result);
    }
  }catch(error) {
    console.log(error);
  }
  
};


