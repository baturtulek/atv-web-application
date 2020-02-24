/* eslint-disable no-undef */
'use strict'

const Sequelize = require('sequelize');
const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT
});

//having a single db object to access all models and connection
const db = {};
Sequelize
db.Sequelize = Sequelize;
db.connection = connection;

//Models/tables
db.User = require('../models/USER')(connection, Sequelize);
db.UserRole = require('../models/USER_ROLE')(connection, Sequelize);
db.Competency = require('../models/COMPETENCY')(connection, Sequelize);
db.ParkingLot = require('../models/PARKING_LOT')(connection, Sequelize);
db.ParkingType = require('../models/PARKING_TYPE')(connection, Sequelize);
db.RegistrationType = require('../models/REGISTRATION_TYPE')(connection, Sequelize);
db.RoleCompetency = require('../models/ROLE_COMPETENCY')(connection, Sequelize);
db.TowedVehicle = require('../models/TOWED_VEHICLE')(connection, Sequelize);
db.Vehicle = require('../models/VEHICLE')(connection, Sequelize);
db.VehicleBrand = require('../models/VEHICLE_BRAND')(connection, Sequelize);
db.VehicleType = require('../models/VEHICLE_TYPE')(connection, Sequelize);
db.VehicleState = require('../models/VEHICLE_STATE')(connection, Sequelize);
db.VehicleColor = require('../models/VEHICLE_COLOR')(connection, Sequelize);
db.VehicleBodyStyle = require('../models/VEHICLE_BODY_STYLE')(connection, Sequelize);

db.TowedVehicle.hasOne(db.User,{
  foreignKey: 'id',
  sourceKey: 'staffId'
});
db.TowedVehicle.hasOne(db.ParkingLot, {
  foreignKey: 'id',
  sourceKey: 'parkingLotId'
});
db.TowedVehicle.hasOne(db.VehicleState, {
  foreignKey: 'id',
  sourceKey: 'stateId'
});
db.ParkingLot.hasOne(db.User,{
  foreignKey: 'id',
  sourceKey: 'staffId'
});
db.ParkingLot.hasOne(db.ParkingType,{
  foreignKey: 'id',
  sourceKey: 'parkingTypeId'
});
db.RoleCompetency.hasMany(db.UserRole,{
  foreignKey: 'id',
  sourceKey: 'roleId'
});
db.RoleCompetency.hasMany(db.Competency,{
  foreignKey: 'id',
  sourceKey: 'competencyNo'
});
db.Vehicle.hasOne(db.VehicleType, {
  foreignKey: 'id',
  sourceKey: 'vehicleTypeId'
});
db.Vehicle.hasOne(db.VehicleColor, {
  foreignKey: 'id',
  sourceKey: 'colorId'
});
db.Vehicle.hasOne(db.VehicleBodyStyle, {
  foreignKey: 'id',
  sourceKey: 'bodyTypeId'
});
db.Vehicle.hasOne(db.VehicleBrand, {
  foreignKey: 'id',
  sourceKey: 'brandId'
});

module.exports = db;