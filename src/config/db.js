'use strict'

const Sequelize = require('sequelize');
const connection = new Sequelize(process.env.DB_NAME  || 'ATV', process.env.DB_USER || 'root', process.env.DB_PASS || 'root', {
  host: process.env.DB_HOST || '35.223.173.124',
  dialect: 'mysql'
});

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

//Models/tables
db.User = require('../models/userModel')(connection, Sequelize);
db.Vehicle = require('../models/vehicleModel')(connection, Sequelize);
db.VehicleType = require('../models/vehicleTypeModel')(connection, Sequelize);
db.VehicleBrandEnum = require('../models/vehicleBrandEnumModel')(connection, Sequelize);
db.VehicleColorEnum = require('../models/vehicleColorEnumModel')(connection, Sequelize);
db.VehicleStateEnum = require('../models/vehicleStateEnumModel')(connection, Sequelize);
db.ParkingLotTypeEnum = require('../models/parkingLotTypeEnumModel')(connection, Sequelize);

//Relations

db.VehicleBrandEnum.belongsTo(db.VehicleType);
db.VehicleColorEnum.belongsTo(db.VehicleType);
db.VehicleType.belongsTo(db.Vehicle);
db.VehicleStateEnum.belongsTo(db.Vehicle);
db.ParkingLotTypeEnum.belongsTo(db.Vehicle);

/*
db.comments.belongsTo(db.posts);
db.posts.hasMany(db.comments);
db.posts.belongsTo(db.users);
db.users.hasMany(db.posts);*/

module.exports = db;