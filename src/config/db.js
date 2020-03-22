/* eslint-disable no-undef */
const Sequelize = require('sequelize');

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
});

// having a single db object to access all models and connection
const db = {};
db.Sequelize = Sequelize;
db.connection = connection;

// Models/tables
db.User = require('../models/User')(connection, Sequelize);
db.UserRole = require('../models/UserRole')(connection, Sequelize);
db.UserLastLogin = require('../models/UserLastLogin')(connection, Sequelize);
db.Competency = require('../models/Competency')(connection, Sequelize);
db.ParkingLot = require('../models/ParkingLot')(connection, Sequelize);
db.ParkingType = require('../models/ParkingType')(connection, Sequelize);
db.RoleCompetency = require('../models/RoleCompetency')(connection, Sequelize);
db.TowedVehicle = require('../models/TowedVehicle')(connection, Sequelize);
db.Vehicle = require('../models/Vehicle')(connection, Sequelize);
db.VehicleBrand = require('../models/VehicleBrand')(connection, Sequelize);
db.VehicleType = require('../models/VehicleType')(connection, Sequelize);
db.VehicleState = require('../models/VehicleState')(connection, Sequelize);
db.VehicleColor = require('../models/VehicleColor')(connection, Sequelize);
db.VehicleBodyStyle = require('../models/VehicleBodyStyle')(connection, Sequelize);
db.EnforcementOffice = require('../models/EnforcementOffice')(connection, Sequelize);
db.Discount = require('../models/Discount')(connection, Sequelize);
db.AdditionalFee = require('../models/AdditionalFee')(connection, Sequelize);
db.TowFirm = require('../models/TowFirm')(connection, Sequelize);

db.TowedVehicle.hasOne(db.User, {
  foreignKey: 'id',
  sourceKey: 'staffId',
});
db.TowedVehicle.hasOne(db.ParkingLot, {
  foreignKey: 'id',
  sourceKey: 'parkingLotId',
});
db.TowedVehicle.hasOne(db.VehicleState, {
  foreignKey: 'id',
  sourceKey: 'stateId',
});
db.ParkingLot.hasOne(db.User, {
  foreignKey: 'id',
  sourceKey: 'staffId',
});
db.ParkingLot.hasOne(db.ParkingType, {
  foreignKey: 'id',
  sourceKey: 'parkingTypeId',
});
db.RoleCompetency.hasMany(db.UserRole, {
  foreignKey: 'id',
  sourceKey: 'roleId',
});
db.RoleCompetency.hasMany(db.Competency, {
  foreignKey: 'id',
  sourceKey: 'competencyNo',
});
db.Vehicle.hasOne(db.VehicleType, {
  foreignKey: 'id',
  sourceKey: 'vehicleTypeId',
});
db.Vehicle.hasOne(db.VehicleColor, {
  foreignKey: 'id',
  sourceKey: 'colorId',
});
db.Vehicle.hasOne(db.VehicleBodyStyle, {
  foreignKey: 'id',
  sourceKey: 'bodyTypeId',
});
db.Vehicle.hasOne(db.VehicleBrand, {
  foreignKey: 'id',
  sourceKey: 'brandId',
});
db.Vehicle.hasMany(db.TowedVehicle, {
  foreignKey: 'plate',
  sourceKey: 'plate',
});
db.TowedVehicle.belongsTo(db.Vehicle, {
  foreignKey: 'plate',
  sourceKey: 'plate',
});
db.User.hasOne(db.UserRole, {
  foreignKey: 'id',
  sourceKey: 'roleId',
});
db.UserLastLogin.hasOne(db.User, {
  foreignKey: 'id',
  sourceKey: 'userId',
});

module.exports = db;
